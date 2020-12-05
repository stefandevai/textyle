import {
  ADD_TILESET,
  ADD_TILESETS,
  SELECT_TILESET,
  SELECT_TILE,
  SELECT_TOOL,
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

