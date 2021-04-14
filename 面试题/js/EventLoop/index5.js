// Promise.resolve(1)
//   .then((v) => {
//     return v;
//   })
//   .then((v) => console.log(v));
new Promise((resolve) => {
  resolve(1);
})
  .then((v) => {
    return v;
  })
  .then((v) => console.log(v));
new Promise((resolve) => {
  // resolve(2);
})
  .then((v) => {
    return v;
  })
  .then((v) => console.log(v));
