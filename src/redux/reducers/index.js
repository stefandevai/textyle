import { combineReducers } from 'redux';
import tileset from 'redux/reducers/tileset';
import canvas from 'redux/reducers/canvas';
import layers from 'redux/reducers/layers';

export default combineReducers({ tileset, canvas, layers });
