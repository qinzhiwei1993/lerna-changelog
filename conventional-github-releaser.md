# conventional-github-releaser

通过`github api`发布github release

使用前需要先设置环境变量`CONVENTIONAL_GITHUB_RELEASER_TOKEN`,github 获取[Personal access tokens](https://github.com/settings/tokens)。如果是私有仓库选择 scope `repo`，如果是公开的仓库选择 scope `public_repo`

### 快速开始

```bin
$ npm install -g conventional-github-releaser
$ cd my-project
$ conventional-github-releaser -p angular
```

```json
// package.json
{
    "scripts": {
        "release": "conventional-github-releaser -p angular -n changelog-options.js -i CHANGELOG.md -s -r 0"
    }
}
```

