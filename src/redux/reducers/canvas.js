import { SELECT_TOOL, DIPLAY_SIDEBAR, SET_TILE_SIZE } from "redux/actionTypes";
import { DEFAULT_TOOL } from "resources/tools";

// TODO: Change way of dealing with tile sizes
const initialState = {
  selectedTool: DEFAULT_TOOL,
  showSidebar: false,
  tileSize: [32, 32],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SELECT_TOOL: {
      const { tool } = action.payload;
      return {
        ...state,
        selectedTool: tool,
      };
    }

    case DIPLAY_SIDEBAR: {
      const { display } = action.payload;
      return {
        ...state,
        showSidebar: display,
      };
    }

    case SET_TILE_SIZE: {
      const { size } = action.payload;

      if (!size) {
        return state;
      }

      return {
        ...state,
        tileSize: size,
      };
    }

    default:
      return state;
  }
}
