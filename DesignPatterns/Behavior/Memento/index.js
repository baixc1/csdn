// 缓存数据（备忘录模式）
var Page = (function () {
  // 缓存对象
  var cache = {};

  // 获取数据（缓存或网络请求）
  return function (page) {
    if (cache[page]) {
      return Promise.resolve(cache[page]);
    } else {
      return new Promise((resolve, reject) => {
        // 模拟ajax请求
        setTimeout(() => {
          const res = { list: [], total: 0, page };
          cache[page] = res;
          resolve(res);
        }, 1000);
      });
    }
  };
})();

// 测试代码
(async () => {
  let data = await Page(1);
  console.log(data); // 1s后获取数据（模拟网络请求）
  data = await Page(1);
  console.log(data); // 立即获取数据（缓存）
  data = await Page(2);
  console.log(data); // 1s后获取数据（模拟网络请求）
})();
