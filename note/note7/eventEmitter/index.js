const geektime = require('./lib.js')
geektime.addListener('newlesson',(res)=>{
  if(res.price < 50){
    console.log('buy!当前价格为---',res)
  }
})