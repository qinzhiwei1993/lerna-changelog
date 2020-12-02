# conventional-changelog

### 读源码顺序

-   `conventional-changelog-cli` 参数定义，获取入参，执行读取、写入
-   `conventional-changelog` 判断是否有预设，使用预设，调用`conventional-changelog-core`
-   `conventional-changelog-preset-loader` 预设解析 loader
-   `conventional-changelog-angular` angular 预设
-   `conventional-changelog-core` 核心逻辑
    -   `merge-config.js` 默认配置与预设、自定义参数的合并，
-   `conventional-changelog-writer` 写入
-   `conventional-commits-parser` 解析 commit

### vscode 调试方法

使用 vscode 默认带的 debug 插件，创建`launch.json`文件

```json
{
    // 使用 IntelliSense 了解相关属性。
    // 悬停以查看现有属性的描述。
    // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "cwd": "${workspaceFolder}",
            "program": "${workspaceFolder}/node_modules/conventional-changelog-cli/cli.js",
            "args": [
                "-p",
                "angular", // 预设
                "-i", // 读取文件
                "CHANGELOG.md",
                "-s", // 读取和写入文件是否相同
                "-r", // 是否覆盖
                "0",
                "-n", // 自定义配置文件
                "./changelog-options.js"
            ]
        }
    ]
}
```

### 配置的优先级

1. 通过`-n`指定自定义配置文件， 例 `conventional-changelog -c changelog-options.js -i CHANGELOG.md -s -r 0`
2. 使用预设的配置
3. `conventional-changelog`默认配置

### `angular`预设默认配置

```javascript
const compareFunc = require('compare-func')
transform: (commit, context) => {
      let discard = true
      const issues = []

      commit.notes.forEach(note => {
        note.title = 'BREAKING CHANGES'
        discard = false
      })

      if (commit.type === 'feat') {
        commit.type = 'Features'
      } else if (commit.type === 'fix') {
        commit.type = 'Bug Fixes'
      } else if (commit.type === 'perf') {
        commit.type = 'Performance Improvements'
      } else if (commit.type === 'revert' || commit.revert) {
        commit.type = 'Reverts'
      } else if (discard) { // 之后type不在写入changelog.md文件中
        return
      } else if (commit.type === 'docs') {
        commit.type = 'Documentation'
      } else if (commit.type === 'style') {
        commit.type = 'Styles'
      } else if (commit.type === 'refactor') {
        commit.type = 'Code Refactoring'
      } else if (commit.type === 'test') {
        commit.type = 'Tests'
      } else if (commit.type === 'build') {
        commit.type = 'Build System'
      } else if (commit.type === 'ci') {
        commit.type = 'Continuous Integration'
      }

      if (commit.scope === '*') {
        commit.scope = ''
      }

      if (typeof commit.hash === 'string') {
        commit.shortHash = commit.hash.substring(0, 7)
      }

      if (typeof commit.subject === 'string') {
        let url = context.repository
          ? `${context.host}/${context.owner}/${context.repository}`
          : context.repoUrl
        if (url) {
          url = `${url}/issues/`
          // Issue URLs.
          commit.subject = commit.subject.replace(/#([0-9]+)/g, (_, issue) => {
            issues.push(issue)
            return `[#${issue}](${url}${issue})`
          })
        }
        if (context.host) {
          // User URLs.
          commit.subject = commit.subject.replace(/\B@([a-z0-9](?:-?[a-z0-9/]){0,38})/g, (_, username) => {
            if (username.includes('/')) {
              return `@${username}`
            }

            return `[@${username}](${context.host}/${username})`
          })
        }
      }

      // remove references that already appear in the subject
      commit.references = commit.references.filter(reference => {
        if (issues.indexOf(reference.issue) === -1) {
          return true
        }

        return false
      })

      return commit
    },
    groupBy: 'type',
    commitGroupsSort: 'title',
    commitsSort: ['scope', 'subject'],
    noteGroupsSort: 'title',
    notesSort: compareFunc
  }
```

### `context` json 文件的路径，定义模板中变量

```javascript
{
    commit:'commit'
    gitSemverTags:['v0.2.0', 'v0.1.0']
    host:'https://github.com'
    issue:'issues'
    owner:'qinzhiwei1993'
    packageData:{name: 'root', private: true, version: '0.1.0', workspaces: Array(1), scripts: {…}, …}
    repository:'lerna-changelog'
    repoUrl:'https://github.com/qinzhiwei1993/lerna-changelog'
    version:'0.1.0'
}
```

### `git-raw-commit`

读取本地 commit 提交信息，返回`Stream`

整个`commit`的读取，到`CHANGELOG.md`写入都是使用`NODE.js`中`Stream`完成

### `conventional-changelog`生成的文档是自上次打`tag`以来的所有变更，所以在使用前需要打`tag`

发版 -> 打`tag` -> 更新`CHANGELOG.md`

### 快速启动

```bash
$ npm install -g conventional-changelog-cli
$ cd my-project

# 在之前CHANGELOG.md基础上叠加，更新最近一个tag的commit msg
$ conventional-changelog -p angular -i CHANGELOG.md -s

# 更新全部commit msg，覆盖CHANGELOG.md
conventional-changelog -p angular -i CHANGELOG.md -s -r 0
```

### 推荐工作流

1. Make changes
2. Commit those changes
3. Make sure Travis turns green
4. Bump version in package.json
5. conventionalChangelog
6. Commit package.json and CHANGELOG.md files
7. Tag
8. Push

The reason why you should commit and tag after conventionalChangelog is that the CHANGELOG should be included in the new release, hence gitRawCommitsOpts.from defaults to the latest semver tag.

```json
// 使用npm scripts
{
    "scripts": {
        "version": "conventional-changelog -p angular -i CHANGELOG.md -s && git add CHANGELOG.md"
    }
}
```
