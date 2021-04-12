Promise.allSettled = function (list) {
  console.log('go custom function')
  const len = list.length
  const res = new Array(len)
  let count = 0
  return new Promise((resolve, reject) => {
    list.forEach((item, index) => {
      Promise.resolve(item)
        .then(d => callback(d, index, resolve, true))
        .catch(d => callback(d, index, resolve, false))
    })
  })

  function callback(value, index, resolve, isResolve) {
    res[index] = {
      value
    }
    if (isResolve) {
      res[index] = {
        status: 'fulfilled',
        value
      }
    } else {
      res[index] = {
        status: 'rejected',
        reason: value
      }
    }
    count++
    if (count === len) {
      resolve(res)
    }
  }
}

const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) => setTimeout(reject, 100, 'foo'));
const promises = [promise1, promise2];

Promise.allSettled(promises).
  then(v => console.log(v));