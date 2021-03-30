// 投票结果状态对象
var ResultState = (function () {
  var States = {
    state0() {
      console.log("第一种情况");
    },
    state1() {
      console.log("第二种情况");
    },
    state2() {
      console.log("第三种情况");
    },
    state3() {
      console.log("第四种情况");
    },
  };
  function show(res) {
    States[`state${res}`] && States[`state${res}`]();
  }
  // 闭包
  return {
    show,
  };
})();

ResultState.show(1);
