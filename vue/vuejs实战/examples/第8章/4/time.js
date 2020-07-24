const Time = {
  getUnix(){
    return Date.now()
  },
  getTodayUnix(){
    const date = new Date()
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)
    return date.getTime()
  },
  getYearUnix(){
    const date = new Date()
    date.setMonth(0)
    date.setDate(1)
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)
    return date.getTime()
  },
  getLastDate(time){
    const date = new Date(time)
    const year = date.getFullYear()
    const month = String(date.getMonth + 1).padLeft(2, '0')
    const day = String(date.getDate()).padLeft(2, '0')
    return `${year}-${month}-${day}`
  },
  getFormatTime(timestamp){
    const now = this.getUnix()
    const today = this.getTodayUnix()
    const timer = (now - timestamp) / 1000
    let tip
    const s = Math.floor(timer / 60) // 分
    if(s <= 0){ // 1分钟前
      tip = '刚刚'
    }else if(s < 60){
      tip = `${s}分钟前`
    }else if(timestamp - today >= 0){
      tip = Math.floor(timer/3600) + '小时前'
    }else if(timer/86400 <= 31){
      tip = Math.ceil(timer/86400) + '天前'
    }else {
      tip = this.getLastDate(timestamp)
    }
    return tip
  }
}

Vue.directive('time', {
  bind(el, binding){
    console.log(binding)
    el.innerHTML = Time.getFormatTime(binding.value)
    el.__timeout__ = setInterval(()=>{
      el.innerHTML = Time.getFormatTime(binding.value)
    })
  },
  unbind(el){
    clearInterval(el.__timeout__)
    delete el.__timeout__
  }
})