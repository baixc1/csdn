// 使用useReducer 实现多个state的控制
import React, { useReducer, useContext } from "react";

// 定义 context函数
const LoginContext = React.createContext();

const initState = {
  name: "",
  pwd: "",
  isLoading: false,
  error: "",
  isLoggedIn: false,
};
function loginReducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    case "success":
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
      };
    case "error":
      return {
        ...state,
        error: action.payload.error,
        name: "",
        pwd: "",
        isLoading: false,
      };
    default:
      return state;
  }
}
function LoginPage() {
  const [state, dispatch] = useReducer(loginReducer, initState);
  const { name, pwd, isLoading, error, isLoggedIn } = state;
  const login = (event) => {
    event.preventDefault();
    dispatch({ type: "login" });
    const login = (opt) => {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, 1500);
      });
    };
    login({ name, pwd })
      .then(() => {
        dispatch({ type: "success" });
      })
      .catch((error) => {
        dispatch({
          type: "error",
          payload: { error: error.message },
        });
      });
  };
  return (
    <LoginContext.Provider value={dispatch}>
      isLoading: {"" + isLoading}
      <br />
      isLoggedIn: {"" + isLoggedIn}
      <br />
      error: {"" + error}
      <br />
      <button onClick={login}>点我</button>
      <LoginButton />
    </LoginContext.Provider>
  );
}
function LoginButton() {
  // 子组件中直接通过context拿到dispatch，出发reducer操作state
  const dispatch = useContext(LoginContext);
  const click = () => {
    dispatch({ type: "login" });
    setTimeout(() => {
      dispatch({
        type: "error",
        payload: { error: "子组件报错了" },
      });
    }, 1000);
  };
  return <button onClick={click}>点我（我是子组件）</button>;
}

export default LoginPage;
