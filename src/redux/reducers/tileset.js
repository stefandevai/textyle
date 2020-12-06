import {
  ADD_TILESET,
  ADD_TILESETS,
  SELECT_TILESET,
  SELECT_TILE,
} from 'redux/actionTypes'

const initialState = {
  tilesetNames: [],
  selectedTileset: '',
  selectedTile: -1,
}

export default function(state = initialState, action) {
  switch(action.type) {
    case ADD_TILESETS: {
      const { names } = action.payload;

      return {
        ...state,
        tilesetNames: [...state.tilesetNames, ...names],
      };
    }

    case ADD_TILESET: {
      const { name } = action.payload;
      return {
        ...state,
        tilesetNames: [...state.tilesetNames, name],
        selectedTileset: name,
      };
    }

    case SELECT_TILESET: {
      const { name } = action.payload;
      return {
        ...state,
        selectedTileset: name,
      };
    }

    case SELECT_TILE: {
      const { value } = action.payload;
      return {
        ...state,
        selectedTile: value,
      };
    }

    default:
      return state;
  }
}
