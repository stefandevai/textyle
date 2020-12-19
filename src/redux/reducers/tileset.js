import {
  ADD_TILESET,
  LOAD_EXISTING_TILESET,
  UPDATE_TILESET,
  COMPLETE_TEXTURE_LOADING,
  SELECT_TILESET,
  DELETE_TILESET,
  SELECT_TILE,
} from "redux/actionTypes";

const initialState = {
  tilesetNames: [],
  tilesets: {},
  selectedTileset: "",
  selectedTile: -1,
  hasLoadedTextures: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_EXISTING_TILESET:
    case ADD_TILESET: {
      const { name, tileSize } = action.payload;
      return {
        ...state,
        tilesetNames: [...state.tilesetNames, name],
        tilesets: {
          ...state.tilesets,
          [name]: { tileSize },
        },
        selectedTileset: name,
      };
    }

    case UPDATE_TILESET: {
      const { name, tileSize } = action.payload;

      if (!state.tilesetNames.includes(name)) {
        return state;
      }

      return {
        ...state,
        tilesets: {
          ...state.tilesets,
          [name]: { tileSize },
        },
      };
    }

    case COMPLETE_TEXTURE_LOADING: {
      return {
        ...state,
        hasLoadedTextures: true,
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
      const { [name]: value, ...newTilesets } = state.tilesets;

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
        tilesets: newTilesets,
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
