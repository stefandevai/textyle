import { set, get, Store } from 'idb-keyval';

const textureStore = new Store('textures-store', 'textures');

export const getTextureBlob = async (name) => {
  return await get(name, textureStore);
};

export const setTextureBlob = async (name, fileBlob) => {
  await set(name, fileBlob, textureStore);
};

