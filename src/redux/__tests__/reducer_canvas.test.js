import * as types from '../actionTypes';
import reducer from '../reducers/canvas';
import {
  DEFAULT_TOOL,
  FILL_TOOL,
} from 'ui/canvas/tools';

it('should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual({
    selectedTool: DEFAULT_TOOL,
  });
});

it('should handle SELECT_TOOL', () => {
  let state = reducer(undefined, {
    type: types.SELECT_TOOL,
    payload: { tool: FILL_TOOL }
  });
  expect(state.selectedTool).toEqual(FILL_TOOL);

  state = reducer(undefined, {
    type: types.SELECT_TOOL,
    payload: { tool: DEFAULT_TOOL }
  });
  expect(state.selectedTool).toEqual(DEFAULT_TOOL);
});
