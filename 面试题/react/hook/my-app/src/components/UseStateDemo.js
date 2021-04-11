import React, { useState, useEffect } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  console.log("init");
  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1);
    }, 1000);
    return () => clearInterval(id);
  }, [count]);

  return (
    <>
      <h1>{count}</h1>
    </>
  );
}
export default Counter;
