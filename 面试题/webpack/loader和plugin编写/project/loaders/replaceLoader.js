const loaderUtils = require("loader-utils");
module.exports = function (source) {
  // console.log(this.query)
  const options = loaderUtils.getOptions(this);
  const result = source.replace("hello", options.name);
  this.callback(null, result);
};
