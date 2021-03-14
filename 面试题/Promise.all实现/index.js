Promise.allCustom = function (list) {
  const len = list.length
  const res = new Array(len)
  let count = 0
  return new Promise((resolve, reject) => {
    list.forEach((item, index) => {
      Promise.resolve(item)
        .then(d => {
          res[index] = d
          count++
          if (count === len) {
            resolve(res)
          }
        })
        .catch(e => reject(e))
    })
  })
}

// const promise1 = Promise.resolve(3);
// const promise2 = 42;
// const promise3 = new Promise((resolve, reject) => {
//   setTimeout(resolve, 100, 'foo');
// });

// Promise.allCustom([promise1, promise2, promise3]).then((values) => {
//   console.log(values);
// });


// this will be counted as if the iterable passed is empty, so it gets fulfilled
// var p = Promise.allCustom([1, 2, 3]);
// // this will be counted as if the iterable passed contains only the resolved promise with value "444", so it gets fulfilled
// var p2 = Promise.allCustom([1, 2, 3, Promise.resolve(444)]);
// // this will be counted as if the iterable passed contains only the rejected promise with value "555", so it gets rejected
// var p3 = Promise.allCustom([1, 2, 3, Promise.reject(555)]);

// // using setTimeout we can execute code after the stack is empty
// setTimeout(function () {
//   console.log(p);
//   console.log(p2);
//   console.log(p3);
// });


// we are passing as argument an array of promises that are already resolved,
// to trigger Promise.all as soon as possible
// var resolvedPromisesArray = [22, 33];
var resolvedPromisesArray = [];

var p = Promise.all(resolvedPromisesArray);
// immediately logging the value of p
console.log(p);

// using setTimeout we can execute code after the stack is empty
setTimeout(function () {
  console.log('the stack is now empty');
  console.log(p);
});