import { compose, createStore, applyMiddleware } from 'redux';
import rootReducer from 'redux/reducers';
import { tilemapReduxMiddleware } from 'tilemap';
import { idbReduxMiddleware } from 'idbTextureStore';

// Remove Redux Devtools in production
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(tilemapReduxMiddleware, idbReduxMiddleware)));
export default store;
