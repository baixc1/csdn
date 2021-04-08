let memoizedState = []; // hooks 存放在这个数组
let cursor = 0; // 当前 memoizedState 下标

function useState(initialValue) {
  memoizedState[cursor] = memoizedState[cursor] || initialValue;
  const currentCursor = cursor;
  function setState(newState) {
    memoizedState[currentCursor] = newState;
    render();
  }
  return [memoizedState[cursor++], setState]; // 返回当前 state，并把 cursor 加 1
}

function useEffect(callback, depArray) {
  const hasNoDeps = !depArray;
  const deps = memoizedState[cursor];
  const hasChangedDeps = deps
    ? !depArray.every((el, i) => el === deps[i])
    : true;
  if (hasNoDeps || hasChangedDeps) {
    callback();
    memoizedState[cursor] = depArray;
  }
  cursor++;
}

function fn() {
  const [count, setCount] = useState(0);
  const [username, setUsername] = useState("fan");
  useEffect(() => {
    console.log(count);
  }, [count]);
  useEffect(() => {
    console.log(username);
  }, [username]);
  console.log(cursor);
  console.log(memoizedState);

  // 模拟按钮
  var btn = document.createElement("button");
  btn.innerText = "按钮：" + count;
  btn.onclick = function () {
    setCount(count + 1);
  };
  document.body.innerHTML = "";
  document.body.appendChild(btn);
}

function render() {
  cursor = 0;
  fn();
}
render();
