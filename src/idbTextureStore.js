import { set, get, del, keys, Store } from "idb-keyval";
import TileManagerInstance from "renderer/TileManager";
import { selectTileset } from "redux/actions";
import { LOCAL_STORAGE_LAST_SELECTED_TILESET } from "ui/constants";
import reduxStore from "redux/store";
import { completeTextureLoading } from "redux/actions";

const textureStore = new Store("textures-store", "textures");

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

export const setTextureData = async (name, tileSize, data) => {
  // TODO: If the texture already exists, choose a new name
  try {
    await set(name, { file: data, tileSize: tileSize, tilesetIndex: TileManagerInstance.lastId }, textureStore);
    await TileManagerInstance.addTiles(name, tileSize);
    localStorage.setItem(LOCAL_STORAGE_LAST_SELECTED_TILESET, name);
  } catch (err) {
    console.error(err);
  }
};

export const updateTextureData = async (name, tileSize, data) => {
  // TODO: If the texture already exists, choose a new name
  try {
    const exists = await hasTexture(name);

    if (!exists) {
      return;
    }

    const oldData = await get(name, textureStore);

    await set(name, {
      file: data || oldData.file,
      tileSize: tileSize || oldData.tileSize,
      tilesetIndex: oldData.tilesetIndex,
    }, textureStore);

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
};

export const loadTilesFromExistingTilesets = async (tilesets) => {
  // Return if tiles where already loaded
  if (TileManagerInstance.lastId > 0) {
    return;
  }
  // Create tiles from textures
  // Respects order of creation
  for (const tileset of tilesets) {
    try {
      const textureExists = await hasTexture(tileset);
      if (!textureExists) {
        continue;
      }

      const data = await get(tileset, textureStore);

      const tilesetIndex = await TileManagerInstance.addTiles(tileset, data.tileSize);

      // Update idb texture with the new index
      data.tilesetIndex = tilesetIndex;
      await set(tileset, data, textureStore);
    } catch (err) {
      console.error(err);
    }
  }

  reduxStore.dispatch(completeTextureLoading());
};
