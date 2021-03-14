var subType = function () { this.type = 'sub' }

var superType = function () { this.type = 'super' }
var i = new superType()
i.constructor = subType
subType.prototype = i