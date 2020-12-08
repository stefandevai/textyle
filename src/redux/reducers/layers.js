import {
  ADD_LAYER,
  DELETE_LAYER,
  SELECT_LAYER,
  MOVE_LAYER,
  TOGGLE_LAYER_VISIBILITY,
} from 'redux/actionTypes';

const initialState = {
  selected: '',
  ids: [],
  layers: {},
}

export default function(state = initialState, action) {
  switch(action.type) {
    case ADD_LAYER: {
      const { name } = action.payload;
      return {
        ...state,
        ids: [...state.ids, name],
        layers: {
          ...state.layers,
          [name]: {
            visible: true,
          }
        },
        selected: name,
      };
    }

    case DELETE_LAYER: {
      const { name } = action.payload;
      const { [name]: value, ...newLayers } = state.layers;
      const newIds = state.ids.filter(id => id !== name);

      let newSelected = state.selected;

      // If the selected layer is the layer we are deleting and
      // it is not the last layer, select a new index.
      if (newSelected === name && newIds.length > 0) {
        const idx = Math.max(state.ids.indexOf(name) - 1, 0);
        newSelected = newIds[idx];
      }
      else if (newIds.length === 0) {
        newSelected = '';
      }

      return {
        ...state,
        ids: newIds,
        layers: newLayers,
        selected: newSelected,
      };
    }

    case SELECT_LAYER: {
      const { name } = action.payload;
      return {
        ...state,
        selected: name,
      };
    }

    case MOVE_LAYER: {
      const { name, to } = action.payload;
      const from = state.ids.indexOf(name);
      const reorderedIds = state.ids;

      // If the layer exists
      if (from !== -1) {
        reorderedIds.splice(from, 1);
        reorderedIds.splice(to, 0, name);
      }

      return {
        ...state,
        ids: reorderedIds,
      };
    }

    case TOGGLE_LAYER_VISIBILITY: {
      const { name } = action.payload;
      return {
        ...state,
        layers: {
          ...state.layers,
          [name]: {
            ...state.layers[name],
            visible: !state.layers[name].visible,
          }
        }
      }
    }

    default:
      return state;
  }
}
