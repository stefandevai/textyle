import {
  ADD_TILESET,
  ADD_TILESETS,
  SELECT_TILESET,
  SELECT_TILE,
  SELECT_TOOL,
  ADD_LAYER,
  DELETE_LAYER,
  SELECT_LAYER,
  MOVE_LAYER,
  TOGGLE_LAYER_VISIBILITY,
} from 'redux/actionTypes';

export const addTileset = name => ({
  type: ADD_TILESET,
  payload: { name },
});

export const addTilesets = names => ({
  type: ADD_TILESETS,
  payload: { names },
});

export const selectTileset = name => ({
  type: SELECT_TILESET,
  payload: { name },
});

export const selectTile = value => ({
  type: SELECT_TILE,
  payload: { value },
});

export const selectTool = tool => ({
  type: SELECT_TOOL,
  payload: { tool },
});

export const addLayer = name => ({
  type: ADD_LAYER,
  payload: { name },
});

export const deleteLayer = name => ({
  type: DELETE_LAYER,
  payload: { name },
});

export const selectLayer = name => ({
  type: SELECT_LAYER,
  payload: { name },
});

export const moveLayer = (name, to) => ({
  type: MOVE_LAYER,
  payload: { name, to },
});

export const toggleLayerVisibility = name => ({
  type: TOGGLE_LAYER_VISIBILITY,
  payload: { name },
});
