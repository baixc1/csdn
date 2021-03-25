/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  const sortArr = intervals.sort((a, b) => a[0] - b[0]);
  const ret = [];
  for (let v of sortArr) {
    let retLast = ret[ret.length - 1];
    if (!ret.length || v[0] > retLast[1]) {
      ret.push(v);
    } else {
      retLast[1] = Math.max(retLast[1], v[1]);
    }
  }
  return ret;
};
console.log(
  merge([
    [1, 3],
    [2, 6],
    [8, 10],
    [15, 18],
    [1, 10],
    [30, 50],
  ])
);
