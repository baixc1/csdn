function throttle(fn, wait) {
  // 记录上一次执行的时间戳
  let previous = 0;
  return function (...args) {
    // 当前的时间戳，然后减去之前的时间戳，大于设置的时间间隔，就执行函数，否则不执行
    if (Date.now() - previous > wait) {
      // 更新上一次的时间戳为当前时间戳
      previous = Date.now();
      fn.apply(this, args);
    }
  };
}

function throttle1(fn, wait) {
  // 设置一个定时器
  let timer = null;
  return function (...args) {
    // 判断如果定时器不存在就执行，存在则不执行
    if (!timer) {
      fn.apply(this, args);
      // 设置下一个定时器
      timer = setTimeout(() => {
        // 然后执行函数，清空定时器
        timer = null;
      }, wait);
    }
  };
}

var Button = document.createElement("Button");
Button.innerHTML = "按钮";
Button.onclick = throttle1(() => {
  console.log("支付");
}, 3000);
document.body.appendChild(Button);
