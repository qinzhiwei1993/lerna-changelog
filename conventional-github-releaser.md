# conventional-github-releaser

通过`github api`发布github release

使用前需要先设置环境变量`CONVENTIONAL_GITHUB_RELEASER_TOKEN`,github 获取[Personal access tokens](https://github.com/settings/tokens)。如果是私有仓库选择 scope `repo`，如果是公开的仓库选择 scope `public_repo`

也可以通过参数的方式传给命令行 `-t e3c6d36e80b8faba29f44e91c5778a8271e83291`

其他参数同`conventional-changelog`，在发布`release`时，本质上还是读取的`conventional-changelog`返回的信息

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
        "release": "conventional-github-releaser -p angular -n changelog-options.js -i CHANGELOG.md -s -r 0 -t e3c6d36e80b8faba29f44e91c5778a8271e83291"
    }
}
```



### 可能遇到的问题

`GitHubError: Validation Failed (422) 报错`

[Github Api](https://developer.github.com/v3/#client-errors)

由于github已存在当前版本的release，所以会报错。只有在首次始终时`-r 0`，之后必须去掉，以免会读取本地所有的`tag`然后尝试去发布
