const express = require('./LikeExpress')

const app = express()

app.use('/path', (req, res, next) => {
  console.log(1)
  next()
  console.log(7)
})

app.get('/path1', (req, res, next) => {
  console.log(2)
  next()
  console.log(5)
}, (req, res, next) => {
  console.log(2.5);
  next()
})

app.post('/path1', (req, res, next) => {
  console.log(8)
  next()
  console.log(9)
})

app.use((req, res, next) => {
  console.log(3)
  res.json({ status: 1, message: 'ok' })
  next()
  console.log(4)
})

app.listen(6001);