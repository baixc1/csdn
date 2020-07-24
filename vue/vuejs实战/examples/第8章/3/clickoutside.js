Vue.directive('clickoutside',{
  bind(el,binding){
    console.log(binding)
    const {esc} = binding.modifiers
    const fn = e => {
      if(el.contains(e.target)){
        return
      }
      if(binding.expression){
        binding.value(e)
      }
    }
    const fn1 = e => {
      if(e.keyCode === 27){
        binding.value(e)
      }
    }
    el.__fn__ = fn
    el.__fn1__ = fn1
    el.__esc__ = esc
    document.addEventListener('click', fn)
    esc && document.addEventListener('keydown', fn1)
  },
  unbind(el){
    document.removeEventListener('click',el.__fun__)
    el.__esc__ && document.removeEventListener('click',el.__fun1__)
    delete el.__fn__
    el.__esc__ && delete el.__fn1__
  }
})