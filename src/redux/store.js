import { createStore } from 'redux';
import rootReducer from 'redux/reducers';

// Remove Redux Devtools in production
export default createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
