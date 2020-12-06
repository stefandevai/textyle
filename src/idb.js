import { set, get, keys, Store } from 'idb-keyval';

const textureStore = new Store('textures-store', 'textures');

// Gets all texture names available
export const getTextureNames = async () => {
  return (await keys(textureStore));
};

export const getTextureData = async (name) => {
  return await get(name, textureStore);
};

export const setTextureData = async (name, data) => {
  await set(name, data, textureStore);
};

export const hasTexture = async (name) => {
  const textureKeys = await keys(textureStore);
  return textureKeys.includes(name);
}
