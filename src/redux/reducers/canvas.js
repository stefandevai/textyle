import {
  SELECT_TOOL,
} from 'redux/actionTypes';

import {
  DEFAULT_TOOL
} from 'ui/toolbar/tools';

const initialState = {
  selectedTool: DEFAULT_TOOL,
}

export default function(state = initialState, action) {
  switch(action.type) {
    case SELECT_TOOL:
      const { tool } = action.payload;
      return {
        ...state,
        selectedTool: tool,
      };

    default:
      return state;
  }
}
