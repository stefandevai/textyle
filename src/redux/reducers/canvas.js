import { SELECT_TOOL, DIPLAY_SIDEBAR } from "redux/actionTypes";
import { DEFAULT_TOOL } from "resources/tools";

const initialState = {
  selectedTool: DEFAULT_TOOL,
  showSidebar: false,
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
      const { state } = action.payload;
      return {
        ...state,
        showSidebar: state,
      };
    }

    default:
      return state;
  }
}
