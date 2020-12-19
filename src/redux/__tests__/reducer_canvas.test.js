import * as types from "../actionTypes";
import reducer from "../reducers/canvas";
import { DEFAULT_TOOL, FILL_TOOL } from "resources/tools";

it("should handle SELECT_TOOL", () => {
  let state = reducer(undefined, {
    type: types.SELECT_TOOL,
    payload: { tool: FILL_TOOL },
  });
  expect(state.selectedTool).toEqual(FILL_TOOL);

  state = reducer(undefined, {
    type: types.SELECT_TOOL,
    payload: { tool: DEFAULT_TOOL },
  });
  expect(state.selectedTool).toEqual(DEFAULT_TOOL);
});
