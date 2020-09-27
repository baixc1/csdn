// 使用commonjs实现剪刀石头布游戏
module.exports = (playerAction)=>{
  // 游戏参数的不合法验证
  if(['rock','scissor','paper'].indexOf(playerAction) == -1){
    throw new Error('invaild playerAction!!')
  }
  var computerAction;
  var random1 = Math.random() * 3;
  if (random1 < 1) {
    computerAction = "rock";
  } else if (random1 > 2) {
    computerAction = "scissor";
  } else {
    computerAction = "paper";
  }
  // 平局
  if (computerAction === playerAction) {
    return 0;
  } else if (
    (computerAction === "rock" && playerAction === "paper") ||
    (computerAction === "scissor" && playerAction === "rock") ||
    (computerAction === "paper" && playerAction === "scissor")
  ) {
    // 你赢了
    return -1;
  } else {
    // 你输了
    return 1;
  }
}