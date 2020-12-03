import {
  CANVAS_CLICKED,
} from 'redux/actionTypes';

import {
  PLACEMENT_TOOL
} from 'ui/toolbar/tools';

const initialState = {
  selectedTool: PLACEMENT_TOOL,
  positionClicked: [-1, -1],
}

export default function(state = initialState, action) {
  switch(action.type) {
    case CANVAS_CLICKED:
      const { position } = action.payload;
      return {
        ...state,
        positionClicked: position,
      };

    default:
      return state;
  }
}
