// src/large-number.js
export default function add(a, b) {
  let i = a.length - 1;
  let j = b.length - 1;
  let res = ''; // 结果
  let carray = 0; // 进位值
  while (i >= 0 || j >= 0) {
    let x = 0;
    let y = 0;
    let sum;
    if (i >= 0) {
      x = a[i] - '0'; // 转换为数字
      i--;
    }
    if (j >= 0) {
      y = b[j] - '0'; // 转换为数字
      j--;
    }
    sum = x + y + carray;
    if (sum >= 10) {
      carray = 1;
      sum -= 10;
    } else {
      carray = 0;
    }
    res = sum + res;
  }
  if (carray > 0) {
    res = carray + res;
  }
  return res;
}
