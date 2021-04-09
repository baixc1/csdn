import { useState, useEffect, useRef } from "react";
const App = () => {
  const [temp, setTemp] = useState(5);
  const [count, setCount] = useState(0);

  const latestCount = useRef(count); // 全局索引对象

  useEffect(() => {
    // Set the mutable latest value
    console.log("最新的count:", count);
    latestCount.current = count; // 更新最新的count
    setTimeout(() => {
      // Read the mutable latest value
      console.log("之前 count =", count);
      console.log("现在 count =", latestCount);
    }, 3000);
  });

  const log = () => {
    setTimeout(() => {
      // 单独的函数和作用域（App）
      console.log("现在 temp =", temp);
    }, 3000);
  };

  return (
    <div>
      <button
        onClick={() => {
          log();
          setTemp(3);
          // 3 秒前 temp = 5，现在 temp = 5
        }}
      >
        setTemp Demo
      </button>
      <button onClick={() => setCount(count + 1)}>count:{count}</button>
    </div>
  );
};

export default App;
