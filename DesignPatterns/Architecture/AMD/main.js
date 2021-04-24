// main.js
// AMD模式实现

(function (F) {
  /**
   * 创建或调用模块
   * @param {string} url 模块名
   * @param {array} deps 模块依赖 （可省略）
   * @param {function} callback 回调
   */
  F.module = function () {
    const args = [].slice.call(arguments),
      callback = args.pop(), // 回调
      deps =
        args.length && Array.isArray(args[args.length - 1]) ? args.pop() : [], // 依赖
      url = args.length ? args.pop() : null, // 模块名
      params = [], // 实际依赖列表（回调函数的参数）
      len = deps.length;
    let depsCount = 0, // 计算异步模块是否全部加载
      i = 0; // 按顺序关联对应的异步模块
    // 有依赖
    if (len) {
      // 异步加载所有模块，按顺序放入params中。等待所有异步结束后，执行setModule
      while (i < len) {
        // 闭包
        (function (i) {
          depsCount++;
          loadModule(deps[i], function (mod) {
            depsCount--;
            params[i] = mod;
            if (depsCount === 0) {
              setModule(url, params, callback);
            }
          });
        })(i);
        i++;
      }
    }
    // 无依赖
    else {
      setModule(url, [], callback);
    }
  };
  const moduleCache = {}; // 模块缓存器
  // 设置模块
  const setModule = function (name, params, callback) {
    const _module = moduleCache[name]; // 模块被调用过
    let fn; // 指向onload队列中函数的指针
    if (_module) {
      _module.status = "loaded";
      _module.exports = callback ? callback.apply(_module, params) : null;
      while ((fn = _module.onload.shift())) {
        fn(_module.exports);
      }
    } else {
      callback && callback.apply(null, params);
    }
  };
  // 异步加载模块
  const loadModule = function (name, callback) {
    // 依赖模块，被要求加载过
    const _module = moduleCache[name];
    if (_module) {
      // 已加载并设置过
      if (_module.status === "loaded") {
        setTimeout(callback(_module.exports), 0);
      } else {
        // 已加载未设置过
        _module.onload.push(callback);
      }
    } else {
      // 缓存模块信息
      moduleCache[name] = {
        name, // 模块ID
        status: "loading", // 脚本加载状态
        exports: null, // 模块接口
        onload: [callback], // 保存回调的队列
      };
      loadScript(getUrl(name));
    }
  };
  // 获取文件路径（调用时，name不能带后缀，否则 loadModule 中 _module匹配不到）（或者需要另外解析）
  const getUrl = function (name) {
    return name + ".js";
  };
  // 动态脚本加载
  const loadScript = function (src) {
    const _script = document.createElement("script");
    _script.src = src;
    _script.charset = "UTF-8";
    document.getElementsByTagName("head")[0].appendChild(_script);
  };
})(
  (function () {
    return (window.F = {});
  })()
);
