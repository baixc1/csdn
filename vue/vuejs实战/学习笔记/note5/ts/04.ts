let list: number[] = [1, 2, 3];
// 泛型
let list1: Array<number> = [1, 2, 3];


// 枚举
enum Color {Red, Green, Blue}
let c: Color = Color.Green; 


// 字符串
let name: string = `Gene`;
// name = 1  //错误警告
let str: any = 'aa'
str = 1

let arr: any = [1, false, 'str']

function warnUser(): void {
  return null
}

// Type 'Error' is not assignable to type 'never'
// function fail():never {   
//   return new Error("Something failed");
// }

const foo = {}; // 零属性对象，添加属性报错
interface Foo {
  bar: number;
  bas: string;
}
const foo1 = {} as Foo // 类型断言
foo1.bar = 123; // Error: 'bar' 属性不存在于 ‘{}’
foo1.bas = 'hello'; 


export {}