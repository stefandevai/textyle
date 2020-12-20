import * as types from "../actionTypes";
import reducer from "../reducers/layers";

it("should handle ADD_LAYER", () => {
  let state = reducer(undefined, {
    type: types.ADD_LAYER,
    payload: { name: "Layer 1" },
  });
  expect(state.names).toEqual(["Layer 1"]);
  expect(state.selected).toEqual("Layer 1");

  state = reducer(state, {
    type: types.ADD_LAYER,
    payload: { name: "Layer 2" },
  });
  expect(state.names).toEqual(["Layer 1", "Layer 2"]);
  expect(state.selected).toEqual("Layer 2");

  state = reducer(state, {
    type: types.ADD_LAYER,
    payload: { name: undefined },
  });
  expect(state.names).toEqual(["Layer 1", "Layer 2", "Layer 3"]);
  expect(state.selected).toEqual("Layer 3");

  state = reducer(state, {
    type: types.ADD_LAYER,
    payload: { name: "" },
  });
  expect(state.names).toEqual(["Layer 1", "Layer 2", "Layer 3", "Layer 4"]);
  expect(state.selected).toEqual("Layer 4");
});

it("should handle UPDATE_LAYER", () => {
  let state = reducer(
    {
      selected: "Layer 1",
      names: ["Layer 1", "Layer 2", "Layer 3"],
      layers: {
        "Layer 1": { visible: true, tileSize: [10, 12] },
        "Layer 2": { visible: true, tileSize: [32, 32] },
        "Layer 3": { visible: false, tileSize: [24, 56] },
      },
    },
    {
      type: types.UPDATE_LAYER,
      payload: { name: "Layer 2", tileSize: [2, 5] },
    }
  );

  expect(state.layers["Layer 2"].tileSize).toEqual([2, 5]);
  expect(state.layers["Layer 2"].visible).toEqual(true);

  state = reducer(state, {
    type: types.UPDATE_LAYER,
    payload: { name: "Layer 3", tileSize: [16, 19] },
  });

  expect(state.layers["Layer 3"].tileSize).toEqual([16, 19]);
  expect(state.layers["Layer 3"].visible).toEqual(false);
});

it("should handle DELETE_LAYER", () => {
  let state = reducer(
    {
      selected: "Layer 1",
      names: ["Layer 1", "Layer 2", "Layer 3"],
      layers: {
        "Layer 1": { visible: true },
        "Layer 2": { visible: true },
        "Layer 3": { visible: false },
      },
    },
    {
      type: types.DELETE_LAYER,
      payload: { name: "Layer 2" },
    }
  );
  expect(state.names).toEqual(["Layer 1", "Layer 3"]);
  expect(state.selected).toEqual("Layer 1");

  state = reducer(state, {
    type: types.DELETE_LAYER,
    payload: { name: "Layer 1" },
  });
  expect(state.names).toEqual(["Layer 3"]);
  expect(state.selected).toEqual("Layer 3");

  state = reducer(state, {
    type: types.DELETE_LAYER,
    payload: { name: "Layer 3" },
  });
  expect(state.names).toEqual([]);
  expect(state.layers).toEqual({});
  expect(state.selected).toEqual("");
});

it("should handle SELECT_LAYER", () => {
  let state = reducer(
    {
      selected: "Layer 1",
      names: ["Layer 1", "Layer 2", "Layer 3"],
      layers: {
        "Layer 1": { visible: true },
        "Layer 2": { visible: true },
        "Layer 3": { visible: false },
      },
    },
    {
      type: types.SELECT_LAYER,
      payload: { name: "Layer 3" },
    }
  );
  expect(state.selected).toEqual("Layer 3");

  state = reducer(state, {
    type: types.SELECT_LAYER,
    payload: { name: "Layer 2" },
  });
  expect(state.selected).toEqual("Layer 2");
});

it("should handle MOVE_LAYER", () => {
  let state = reducer(
    {
      selected: "Layer 1",
      names: ["Layer 1", "Layer 2", "Layer 3", "Layer 4", "Layer 5"],
      layers: {
        "Layer 1": { visible: true },
        "Layer 2": { visible: true },
        "Layer 3": { visible: false },
        "Layer 4": { visible: true },
        "Layer 5": { visible: false },
      },
    },
    {
      type: types.MOVE_LAYER,
      payload: { name: "Layer 3", to: 0 },
    }
  );
  expect(state.names).toEqual(["Layer 3", "Layer 1", "Layer 2", "Layer 4", "Layer 5"]);

  state = reducer(state, {
    type: types.MOVE_LAYER,
    payload: { name: "Layer 1", to: 4 },
  });
  expect(state.names).toEqual(["Layer 3", "Layer 2", "Layer 4", "Layer 5", "Layer 1"]);
});

it("should handle TOGGLE_LAYER_VISIBILITY", () => {
  let state = reducer(
    {
      selected: "Layer 1",
      names: ["Layer 1", "Layer 2", "Layer 3"],
      layers: {
        "Layer 1": { visible: true },
        "Layer 2": { visible: true },
        "Layer 3": { visible: false },
      },
    },
    {
      type: types.TOGGLE_LAYER_VISIBILITY,
      payload: { name: "Layer 3" },
    }
  );
  expect(state.layers["Layer 3"].visible).toEqual(true);

  state = reducer(state, {
    type: types.TOGGLE_LAYER_VISIBILITY,
    payload: { name: "Layer 2" },
  });
  expect(state.layers["Layer 2"].visible).toEqual(false);

  state = reducer(state, {
    type: types.TOGGLE_LAYER_VISIBILITY,
    payload: { name: "Layer 2" },
  });
  expect(state.layers["Layer 2"].visible).toEqual(true);
});
