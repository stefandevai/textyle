import { SELECT_TOOL, DIPLAY_SIDEBAR, TOGGLE_GRID, SET_TILE_SIZE } from "redux/actionTypes";
import { PLACEMENT_TOOL } from "resources/tools";

// TODO: Change way of dealing with tile sizes
const initialState = {
  selectedTool: PLACEMENT_TOOL,
  tileSize: [32, 32],
  showSidebar: false,
  showGrid: true,
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

    case DIPLAY_SIDEBAR: {
      const { display } = action.payload;
      return {
        ...state,
        showSidebar: display,
      };
    }

    case TOGGLE_GRID: {
      return {
        ...state,
        showGrid: !state.showGrid,
      };
    }

    default:
      return state;
  }
}
