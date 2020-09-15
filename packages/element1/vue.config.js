const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  css: { extract: false },
  devServer: {
    // 热更新 打开
    hot: true,
    host: "localhost",
    port: 3008,
  },
  // 扩展 webpack 配置
  chainWebpack: (config) => {
    
    config.entry('app').clear() // 必须清楚之前的entry

    config
    .entry('app')
    .add(path.resolve(__dirname, './example/main.js'))
    .end()

    config.resolve.alias.set("@", path.resolve(__dirname, "./src"));
    // 把 packages 和 examples 加入编译，因为新增的文件默认是不被 webpack 处理的
    // config.module
    //   .rule("js")
    //   .include.add(/packages/)
    //   .end()
    //   .include.add(/src/)
    //   .end()
    //   .use("babel")
    //   .loader("babel-loader")
    //   .tap((options) => {
    //     // 修改它的选项...
    //     return options;
    //   });
    // config.module
    //   .rule("iview")
    //   .test(/iview.src.*?js$/)
    //   .use("babel")
    //   .loader("babel-loader")
    //   .end();
  },

  // 打包优化
  configureWebpack: {
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: { compress: { drop_console: true } },
        }),
      ],
    },
  },
  productionSourceMap: true,
};
