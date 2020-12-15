import {
  ADD_TILESET,
  LOAD_EXISTING_TILESETS,
  COMPLETE_TEXTURE_LOADING,
  SELECT_TILESET,
  DELETE_TILESET,
  SELECT_TILE,
} from "redux/actionTypes";

const initialState = {
  tilesetNames: [],
  selectedTileset: "",
  selectedTile: -1,
  hasLoadedTextures: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_EXISTING_TILESETS: {
      const { names } = action.payload;

      return {
        ...state,
        tilesetNames: names,
      };
    }

    case COMPLETE_TEXTURE_LOADING: {
      return {
        ...state,
        hasLoadedTextures: true,
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

    case DELETE_TILESET: {
      const { name } = action.payload;
      const newTilesetNames = state.tilesetNames.filter((n) => n !== name);

      let newSelected = state.selectedTileset;

      // If the selected layer is the layer we are deleting and
      // it is not the last layer, select a new index.
      if (newSelected === name && newTilesetNames.length > 0) {
        const idx = Math.max(state.tilesetNames.indexOf(name) - 1, 0);
        newSelected = newTilesetNames[idx];
      } else if (newTilesetNames.length == 0) {
        newSelected = "";
      }

      return {
        ...state,
        selectedTileset: newSelected,
        tilesetNames: newTilesetNames,
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
