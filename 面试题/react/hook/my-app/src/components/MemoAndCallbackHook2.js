// 父组件更新时，动态更新子组件
import React, { useState, useEffect, useCallback } from "react";
// 用于记录 getData 调用次数
let count = 0;

function App() {
  const [val, setVal] = useState("");
  console.log("init");
  function getData() {
    setTimeout(() => {
      console.log("set");
      setVal("new data " + count);
      count++;
    }, 500);
  }
  const getDataUseCallback = useCallback(getData, []);

  return <Child val={val} getData={getDataUseCallback} />;
}

function Child({ val, getData }) {
  useEffect(() => {
    getData();
  }, [getData]);

  return <div>{val}</div>;
}
export default App;
