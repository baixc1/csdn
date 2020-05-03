export const addTodo = text => {
  return {
    type: 'ADD_TODO',
    text
  }
}

export const doThunk = () => {
  return (dispatch, getState) => {
    setTimeout(() => {
      console.log(getState())
      // dispatch(addTodo(22))
    }, 1000)
  }
}