const path = require('path')
const cwdPath = process.cwd()
const fs = require('fs')
// const semver = require('semver')
const { exec } = require('child_process')
const chalk = require('chalk')

const pkgPath = path.resolve(cwdPath, './package.json')
const pkgJson = require(pkgPath)
const pkgName = pkgJson.name

const log = console.log
const success = chalk.green.bold
const error = chalk.red.bold

const CMD = `npm view ${pkgName} version`

const whitePackage = (path, str, options, callback) => {
    fs.writeFile(path, str, options, callback)
}

const changeVersion = () => {
    exec(CMD, (err, stdout, stderr) => {
        if (err) {
            log(error('查询版本号失败，请手动查询', err))
            // log(error('查询版本号失败，请手动查询', err.message))
            process.exit(0) // 不阻止进程执行
        } else {
            pkgJson.version = stdout
            whitePackage(pkgPath, newJson, err => {
                if (err) {
                    log(error('新增失败', err))
                } else {
                    log(
                        success(
                            `修改版本号成功！从 ${stdout} 修改为 ${newVersion}`
                        )
                    )
                }
            })
        }
    })
}

changeVersion()
