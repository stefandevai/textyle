import { UPLOAD_TILESET } from 'redux/actionTypes'

const initialState = {
  names: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case UPLOAD_TILESET:
      const { name } = action.payload;
      return {
        ...state,
        names: [...state.names, name],
        currentTileset: name,
      };
    default:
      return state;
  }
}
