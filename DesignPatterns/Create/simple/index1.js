module.exports = function (name, { content, duration } = {}) {
  var o = {
    name,
    content
  }
  o.show = function () {
    console.log(o.content)
  }
  if (type === 'alert') {
    // alert框 差异部分
  } else if (type === 'confirm') {
    // confirm框 差异部分
  } else if (type === 'toast') {
    // toast框 差异部分
    o.duration = duration
  }
}