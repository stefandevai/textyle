import { UPLOAD_TILESET } from 'redux/actionTypes';

export const uploadTileset = name => ({
  type: UPLOAD_TILESET,
  payload: { name },
});

