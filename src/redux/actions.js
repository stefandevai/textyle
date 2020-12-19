import {
  ADD_TILESET,
  LOAD_EXISTING_TILESET,
  COMPLETE_TEXTURE_LOADING,
  SELECT_TILESET,
  UPDATE_TILESET,
  DELETE_TILESET,
  SELECT_TILE,
  SELECT_TOOL,
  DIPLAY_SIDEBAR,
  SET_TILE_SIZE,
  ADD_LAYER,
  UPDATE_LAYER,
  DELETE_LAYER,
  SELECT_LAYER,
  MOVE_LAYER,
  TOGGLE_LAYER_VISIBILITY,
} from "redux/actionTypes";

export const addTileset = (name, tileSize, tilesetIndex, data) => ({
  type: ADD_TILESET,
  payload: { name, tileSize, tilesetIndex, data },
});

export const loadExistingTileset = (name, tileSize, tilesetIndex) => ({
  type: LOAD_EXISTING_TILESET,
  payload: { name, tileSize, tilesetIndex },
});

export const completeTextureLoading = (names) => ({
  type: COMPLETE_TEXTURE_LOADING,
  payload: {},
});

export const selectTileset = (name) => ({
  type: SELECT_TILESET,
  payload: { name },
});

export const updateTileset = (name, tileSize, tilesetIndex) => ({
  type: UPDATE_TILESET,
  payload: { name, tileSize, tilesetIndex },
});

export const deleteTileset = (name) => ({
  type: DELETE_TILESET,
  payload: { name },
});

export const selectTile = (value) => ({
  type: SELECT_TILE,
  payload: { value },
});

export const selectTool = (tool) => ({
  type: SELECT_TOOL,
  payload: { tool },
});

export const displaySidebar = (display) => ({
  type: DIPLAY_SIDEBAR,
  payload: { display },
});

export const setTileSize = (size) => ({
  type: SET_TILE_SIZE,
  payload: { size },
});

export const addLayer = (obj) => {
  const { name, tileSize, x, y, width, height } = obj || {};

  return {
    type: ADD_LAYER,
    payload: { name, tileSize, x, y, width, height },
  };
};

export const updateLayer = (name, tileSize) => ({
  type: UPDATE_LAYER,
  payload: { name, tileSize },
});

export const deleteLayer = (name) => ({
  type: DELETE_LAYER,
  payload: { name },
});

export const selectLayer = (name) => ({
  type: SELECT_LAYER,
  payload: { name },
});

export const moveLayer = (name, to) => ({
  type: MOVE_LAYER,
  payload: { name, to },
});

export const toggleLayerVisibility = (name) => ({
  type: TOGGLE_LAYER_VISIBILITY,
  payload: { name },
});
