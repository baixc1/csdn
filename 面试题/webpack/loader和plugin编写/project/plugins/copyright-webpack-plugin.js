// 生成一个版权文件
class CopyrightWebpackPlugin {
  constructor() {
    console.log("插件初始化了");
  }
  // 调用插件的时候会调用此方法
  // compiler 是webpack的实例
  apply(compiler) {
    console.log("apply");
    // emit钩子是生成资源到 output 目录之前。异步钩子
    // compilation存放了这次打包的所有内容
    compiler.hooks.emit.tapAsync(
      "CopyrightWebpackPlugin",
      (compilation, cb) => {
        console.log("插件调用了");
        // 添加copyright.txt
        compilation.assets["copyright.txt"] = {
          source: function () {
            return "Copyright by Dunizb";
          },
          size: function () {
            // 文件大小,长度
            return 40;
          },
        };
        cb(); // 最后一定要调用
      }
    );
  }
}
module.exports = CopyrightWebpackPlugin;
