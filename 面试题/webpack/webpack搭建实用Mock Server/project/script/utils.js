/* script/utils.js */

const fs = require("fs");
const path = require("path");

/* 读取mock下的所有js文件 */
function findSync(startPath) {
  let result = [];
  let files = fs.readdirSync(startPath);

  files.forEach((val) => {
    let file = path.join(startPath, val);
    let stats = fs.statSync(file);

    if (stats.isDirectory()) {
      result.push(...findSync(file));
    } else if (stats.isFile()) {
      result.push(file);
    }
  });

  return result;
}

/* 通过require获取js文件中导出的函数，执行并传递app参数 */
const mockServer = (mockFolder, app) => {
  console.log(mockFolder, app);
  findSync(mockFolder).forEach((dir) => require(dir)(app));
  console.log("Mock: service started successfully ✔");
};

module.exports = {
  mockServer,
};
