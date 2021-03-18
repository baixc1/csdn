import usePrevious from "./usePrevious";
import * as React from "react";

const { useState } = React;

export default () => {
  const [count, setCount] = useState(0);
  const previous = usePrevious(count);
  return (
    <>
      <div>counter current value: {count}</div>
      <div style={{ marginBottom: 8 }}>counter previous value: {previous}</div>
      <button type="button" onClick={() => setCount((c) => c + 1)}>
        increase
      </button>
      <button
        type="button"
        style={{ marginLeft: 8 }}
        onClick={() => setCount((c) => c - 1)}
      >
        decrease
      </button>
    </>
  );
};
