// ajax简单封装(未兼容IE)
var sendData = function (data, dealType, dom) {
  var xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  var url = "getData?";
  xhr.onload = function (e) {
    console.log(xhr);
    const { status } = xhr;
    if ((status >= 200 && status < 300) || status === "304") {
      dealData(xhr.response, dealType, dom);
    } else {
      // 失败
    }
  };
  for (var key in data) {
    url += `&${key}=${data[key]}`;
  }
  xhr.open("get", url, true);
  xhr.send(null);
};

var dealData = function (data, dealType, dom) {
  var dataType = Object.prototype.toString.call(data);
  switch (dealType) {
    case "sug":
      // 数组
      if (dataType === "[object Array]") {
        return createSug(data, dom);
      }
      // 对象转数组
      if (dataType === "[object Object]") {
        var list = [];
        for (var key in data) {
          list.push(data[key]);
        }
        return createSug(list, dom);
      }
      // 其他数据转数组
      return createSug([data], dom);
    case "validate":
      return createValidate(data, dom);
  }
};

// 提示组件
var createSug = function (data, dom) {
  dom.parentNode.getElementsByTagName("ul")[0].innerHTML = data.reduce(
    (prev, next) => {
      return prev + `<li>${next}</li>`;
    },
    ""
  );
};

// 校验组件（模拟）
var createValidate = function (data, dom) {
  dom.parentNode.getElementsByTagName("span")[0].innerHTML = data;
};

// 测试
var input = document.getElementsByTagName("input");
[...input].forEach((el) => {
  const { dealtype: dealType, trigger, key } = el.dataset;
  // 绑定事件
  el[`on${trigger}`] = function (e) {
    setTimeout(() => {
      sendData({ value: el.value, key }, dealType, this);
    }, 0);
  };
});
