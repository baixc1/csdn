const mapTag = "[object Map]";
const setTag = "[object Set]";
const arrayTag = "[object Array]";
const objectTag = "[object Object]";
const argsTag = "[object Arguments]";

const boolTag = "[object Boolean]";
const dateTag = "[object Date]";
const numberTag = "[object Number]";
const stringTag = "[object String]";
const symbolTag = "[object Symbol]";
const errorTag = "[object Error]";
const regexpTag = "[object RegExp]";
const funcTag = "[object Function]";

function isObject(target) {
  const type = typeof target;
  return (
    target !== null &&
    (type === "object" || type === "function" || type === "symbol")
  );
}

function cloneOtherType(targe, type) {
  const Ctor = targe.constructor;
  switch (type) {
    case mapTag:
    case setTag:
    case arrayTag:
    case objectTag:
    case argsTag:
      return new Ctor();
    case boolTag: // new xx()
    case numberTag:
    case stringTag:
    case errorTag:
    case dateTag:
      return new Ctor(targe);
    case regexpTag:
      return cloneReg(targe);
    case symbolTag:
      return Object(Symbol.prototype.valueOf.call(targe));
    case funcTag:
      return cloneFunction(targe);
    default:
      return null;
  }
}

function cloneReg(targe) {
  const reFlags = /\w*$/;
  // exec 处理 flags ： /\w*$/.exec(regexp.toString()).toString()
  const result = new targe.constructor(targe.source, reFlags.exec(targe));
  // 配置的开始位置
  result.lastIndex = targe.lastIndex;
  return result;
}

function cloneFunction(func) {
  const bodyReg = /(?<={)(.|\n)+(?=})/m;
  // 后顾：(?<=表达式)，表示前面要有什么
  // 前瞻：(?=表达式)，表示后面要有什么
  const paramReg = /(?<=\().+(?=\)\s+{)/;
  const funcString = func.toString();
  if (func.prototype) {
    const param = paramReg.exec(funcString);
    const body = bodyReg.exec(funcString);
    if (body) {
      if (param) {
        const paramArr = param[0].split(",");
        return new Function(...paramArr, body[0]);
      } else {
        return new Function(body[0]);
      }
    } else {
      return null;
    }
  } else {
    return eval(funcString);
  }
}
exports.clone = function clone(target, map = new Map()) {
  // 克隆原始类型
  if (!isObject(target)) {
    return target;
  }

  const type = Object.prototype.toString.call(target);
  // 初始化
  const cloneTarget = cloneOtherType(target, type);
  // 防止循环引用
  if (map.get(target)) {
    return map.get(target);
  }
  map.set(target, cloneTarget);

  // 克隆set
  if (type === setTag) {
    target.forEach((value) => {
      cloneTarget.add(clone(value, map));
    });
    return cloneTarget;
  }

  // 克隆map
  if (type === mapTag) {
    target.forEach((value, key) => {
      cloneTarget.set(key, clone(value, map));
    });
    return cloneTarget;
  }

  for (const key in target) {
    cloneTarget[key] = clone(target[key], map);
  }
  return cloneTarget;
};
