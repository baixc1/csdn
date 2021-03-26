// const compiler = (input) => {
//   const tokens = tokenizer(input);
//   const ast = parser(tokens);
//   const newAst = transformer(ast);
//   const output = generator(newAst);

//   return output;
// };

var input = "const add = (a, b) => a + b";
var tokens = tokenizer(input);
var ast = parser(tokens);
var newAst = transformer(ast);
var output = generator(newAst);
console.log(output);
// const result = compiler(str);

// console.log(result);
// function add(a,b) {return a + b}
