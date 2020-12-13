import { set, get, del, keys, Store } from 'idb-keyval';
import TileManagerInstance from 'renderer/TileManager';
import { selectTileset } from 'redux/actions';
import { LOCAL_STORAGE_LAST_SELECTED_TILESET } from 'ui/constants';
import {
  ADD_TILESET,
  DELETE_TILESET,
  LOAD_EXISTING_TILESETS
} from 'redux/actionTypes';

const textureStore = new Store('textures-store', 'textures');

// Gets all texture names available
export const getTextureNames = async () => {
  try {
    const textureNames = await keys(textureStore);
    return textureNames;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getTextureData = async (name) => {
  try {
    const data = await get(name, textureStore);
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const setTextureData = async (name, data) => {
  // TODO: If the texture already exists, choose a new name
  try {
    await set(name, { file: data, tilesetIndex: TileManagerInstance.length }, textureStore);
    await TileManagerInstance.addTilesFromTileset(name, [32, 32]);
    localStorage.setItem(LOCAL_STORAGE_LAST_SELECTED_TILESET, name);
  } catch (err) {
    console.error(err);
  }
};

export const deleteTextureData = async (name) => {
  try {
    await del(name, textureStore);
    const lastSelectedTileset = localStorage.getItem(LOCAL_STORAGE_LAST_SELECTED_TILESET);
    if (lastSelectedTileset === name) {
      localStorage.removeItem(LOCAL_STORAGE_LAST_SELECTED_TILESET);
    }
  } catch (err) {
    console.error(err);
  }
};

export const hasTexture = async (name) => {
  try {
    const textureKeys = await keys(textureStore);
    return textureKeys.includes(name);
  } catch (err) {
    console.error(err);
    return false;
  }
}

const loadTilesFromExistingTilesets = async (tilesets) => {
  // Return if tiles where already loaded
  if (TileManagerInstance.length > 0) {
    return;
  }
  // Create tiles from textures
  // Respects order of creation
  // TODO: replace hardcoded 32 x 32 tile size with a user defined one
  for (const tileset of tilesets.reverse()) {
    await TileManagerInstance.addTilesFromTileset(tileset, [32, 32]);
  }
}

const idbReduxMiddleware = store => next => action => {
  switch(action.type) {
    case ADD_TILESET: {
      const { name, data } = action.payload || {};
      setTextureData(name, data);
      break;
    }

    case LOAD_EXISTING_TILESETS: {
      const { names } = action.payload || {};
      loadTilesFromExistingTilesets(names);
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
}

export { idbReduxMiddleware };
