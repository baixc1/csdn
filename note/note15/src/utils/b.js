// utils/b.js
Object.defineProperty(Array.prototype, 'sum', {
  value: function () {
    return this.reduce((sum, num) => sum += num, 0);
  }
})
export function b() {
  console.log([1, 2, 3, 4].sum());
}