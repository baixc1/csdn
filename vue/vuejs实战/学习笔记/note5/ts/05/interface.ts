interface LabelledValue {
  label: string;
}

function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}

let myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);


let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
let b = a as ReadonlyArray<any>
a = ro as number[]
a = ro as Array<any>

// 函数类型
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
// 根据接口校验类型
mySearch = function(src, sub) {
  let result = src.search(sub);
  return result > -1;
}

export {}