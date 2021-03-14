// 复杂对象的创建：应聘者及其信息

// 人：技能+兴趣
var Person = function (params = {}) {
  this.skill = params.skill || '保密'
  //...
}
Person.prototype = {
  getSkill() {
    return this.skill
  }
}

// 姓名
var Named = function (name) {
  ((name) => {
    this.wholeName = name
    const index = name.indexOf(' ')
    if (index > -1) {
      this.firstName = name.slice(0, index)
      this.lastName = name.slice(index)
    }
  })(name)
}

// 职位
var Work = function (work) {
  ((work) => {
    switch (work) {
      case 'code':
        this.work = '工程师'
        this.desc = '喜欢编程'
        break
      case 'UI':
      case 'UE':
        this.work = '设计师'
        this.desc = '喜欢美术'
      case 'teach':
        this.work = '教师'
        this.desc = '喜欢教学'
      default:
        this.work = work
        this.desc = '？？？'
    }
  })(work)
}

Work.prototype = {
  changeWork(work) {
    this.work = work
  },
  changeDesc(desc) {
    this.desc = desc
  }
}

module.exports = function (name, work, { skill, hobby } = {}) {
  var _person = new Person(skill, hobby)
  _person.name = new Named(name)
  _person.work = new Work(work)
  return _person
}