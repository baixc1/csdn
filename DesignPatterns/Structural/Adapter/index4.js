// 处理后端返回的数据obj，返回所需格式的数据
function formatData(obj) {
  return {
    a: format.A(obj.a),
    arr: [obj.c, format.B(obj.d)],
    keys: [obj.key1, obj.key2, obj.key3],
    //...
  };
}

// 数据格式化工具（模拟）
var format = {
  A() {},
  B() {},
};
