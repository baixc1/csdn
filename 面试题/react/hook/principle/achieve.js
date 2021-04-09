// 核心：全局数组，控制组件状态
// 过程：初次渲染 -> 事件触发(set赋值，cursor=0, fn刷新) -> re Render

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

let fun; // fn是销毁函数（简单模拟）
function useEffect(callback, depArray) {
  // 销毁之前函数
  typeof fun === "function" && fun();
  const hasNoDeps = !depArray;
  const deps = memoizedState[cursor];
  const hasChangedDeps = deps
    ? !depArray.every((el, i) => el === deps[i])
    : true;
  if (hasNoDeps || hasChangedDeps) {
    fun = callback();
    memoizedState[cursor] = depArray;
  }
  cursor++;
}

function fn() {
  const [count, setCount] = useState(0);
  const [username, setUsername] = useState("fan");
  useEffect(() => {
    console.log("count", count); // 只执行一次
  }, []);
  useEffect(() => {
    console.log("username", username);
  }, [username]);
  console.log("cursor", cursor);
  console.log("memoizedState", memoizedState);

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
