import { set, get, keys, Store } from 'idb-keyval';

const textureStore = new Store('textures-store', 'textures');

// Gets all texture names available
export const getTextureFiles = async () => {
  return (await keys(textureStore));
};

export const getTextureFile = async (name) => {
  return await get(name, textureStore);
};

export const setTextureFile = async (name, file) => {
  await set(name, file, textureStore);
};

