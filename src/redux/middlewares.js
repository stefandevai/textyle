import TilemapInstance from "tilemap";
import { setTextureData, updateTextureData, deleteTextureData, loadTilesFromExistingTileset } from "idbTextureStore";
import { ADD_TILESET, UPDATE_TILESET, DELETE_TILESET, LOAD_EXISTING_TILESET, ADD_LAYER, DELETE_LAYER } from "redux/actionTypes";

export const idbReduxMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case ADD_TILESET: {
      const { name, tileSize, data } = action.payload || {};
      setTextureData(name, tileSize, data);
      break;
    }

    case LOAD_EXISTING_TILESET: {
      const { name, tileSize } = action.payload || {};
      loadTilesFromExistingTileset(name, tileSize);
      break;
    }

    case UPDATE_TILESET: {
      const { name, tileSize, data } = action.payload || {};
      updateTextureData(name, tileSize, data);
      break;
    }

    case DELETE_TILESET: {
      const { name } = action.payload || {};
      deleteTextureData(name);
      break;
    }

    default:
      break;
  }

  return next(action);
};

export const tilemapReduxMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case ADD_LAYER: {
      let { x, y, width, height } = action.payload || {};
      TilemapInstance.addLayer(x, y, width, height);
      break;
    }

    case DELETE_LAYER: {
      // TODO: Implement layer deletion
      break;
    }

    default:
      break;
  }

  return next(action);
};
