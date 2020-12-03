import { combineReducers } from 'redux';
import tileset from 'redux/reducers/tileset';
import canvas from 'redux/reducers/canvas';

export default combineReducers({ tileset, canvas });
