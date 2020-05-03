import { createStore, applyMiddleware } from './redux/src'
// import thunk from 'redux-thunk'
import reducer from './reducers'
import { logger, thunk } from './middlewares'
import { addTodo, doThunk } from './actions'


const store = createStore(
  reducer,
  // applyMiddleware(logger, thunk)
  applyMiddleware(thunk, logger)
)


// store.dispatch(addTodo(11))
store.dispatch(doThunk())