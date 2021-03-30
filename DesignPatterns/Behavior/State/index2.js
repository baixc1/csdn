// 超级玛丽状态类
var MarryState = function () {
  // 状态（私有变量）
  var _state = {};
  // 动作类型
  var types = {
    jump() {
      console.log("jump"); // 跳跃
    },
    move() {
      console.log("move"); // 移动
    },
    shoot() {
      console.log("shoot"); // 射击
    },
    quat() {
      console.log("quat"); // 蹲下
    },
  };
  // 动作类
  var Action = {
    changeState() {
      var arg = arguments;
      _state = {};
      for (var i = 0; i < arg.length; i++) {
        _state[arg[i]] = true; // 添加动作
      }
      return this;
    },
    goes() {
      console.log("触发一次动作");
      for (var key in _state) {
        types[key] && types[key]();
      }
      return this;
    },
  };
  return {
    change: Action.changeState,
    goes: Action.goes,
  };
};

MarryState()
  .change("quat", "shoot", "move") // 蹲下-射击-移动
  .goes()
  .goes()
  .change("move", "jump") // 移动-跳跃
  .goes();

// 实例话后使用（不影响原对象）
var marry = new MarryState();
marry
  .change("quat", "shoot", "move") // 蹲下-射击-移动
  .goes()
  .goes()
  .change("move", "jump") // 移动-跳跃
  .goes();
