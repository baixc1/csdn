// import React from "react";
// export default class Example extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       val: 0,
//     };
//   }

//   componentDidMount() {
//     this.setState({ val: this.state.val + 1 });
//     console.log(this.state.val); // 第 1 次 log

//     this.setState({ val: this.state.val + 1 });
//     console.log(this.state.val); // 第 2 次 log

//     setTimeout(() => {
//       this.setState({ val: this.state.val + 1 });
//       console.log(this.state.val); // 第 3 次 log 1

//       this.setState({ val: this.state.val + 1 });
//       console.log(this.state.val); // 第 4 次 log 2
//     }, 0);
//   }

//   render() {
//     return null;
//   }
// }

import React, { useEffect, useState } from "react";

const MyComponent = () => {
  const [val, setVal] = useState(0); // 常量 val

  useEffect(() => {
    setVal(val + 1);
    console.log(val); // 直接输出

    setVal(val + 1);
    console.log(val);

    setTimeout(() => {
      // 闭包
      setVal(val + 1);
      console.log(val);

      setVal(val + 1);
      console.log(val);
    }, 0);
  }, []); // 执行一次
  return null;
};

export default MyComponent;
