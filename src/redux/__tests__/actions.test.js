import * as actions from '../actions';
import * as types from '../actionTypes';

it('should create an action an add a tileset', () => {
  const name = 'tileset';
  const expectedAction = {
    type: types.ADD_TILESET,
    payload: { name },
  }

  expect(actions.addTileset(name)).toEqual(expectedAction);
});

it('should create an action an add multiple tilesets', () => {
  const names = ['tileset1', 'tileset2', 'tileset3'];
  const expectedAction = {
    type: types.ADD_TILESETS,
    payload: { names },
  }

  expect(actions.addTilesets(names)).toEqual(expectedAction);
});

it('should create an action an select a tileset', () => {
  const name = 'tileset';
  const expectedAction = {
    type: types.SELECT_TILESET,
    payload: { name },
  }

  expect(actions.selectTileset(name)).toEqual(expectedAction);
});

it('should create an action and select a tile', () => {
  const value = 10;
  const expectedAction = {
    type: types.SELECT_TILE,
    payload: { value },
  }

  expect(actions.selectTile(value)).toEqual(expectedAction);
});

it('should create an action and select a tool', () => {
  const tool = 'TEST_TOOL';
  const expectedAction = {
    type: types.SELECT_TOOL,
    payload: { tool },
  }

  expect(actions.selectTool(tool)).toEqual(expectedAction);
});

it('should create an action and add a layer', () => {
  const name = 'Layer 1';
  const expectedAction = {
    type: types.ADD_LAYER,
    payload: { name },
  }

  expect(actions.addLayer(name)).toEqual(expectedAction);
});

it('should create an action and delete a layer', () => {
  const name = 'Layer 1';
  const expectedAction = {
    type: types.DELETE_LAYER,
    payload: { name },
  }

  expect(actions.deleteLayer(name)).toEqual(expectedAction);
});

it('should create an action and select a layer', () => {
  const name = 'Layer 1';
  const expectedAction = {
    type: types.SELECT_LAYER,
    payload: { name },
  }

  expect(actions.selectLayer(name)).toEqual(expectedAction);
});

it('should create an action and move a layer', () => {
  const name = 'Layer 1';
  const to = 2;
  const expectedAction = {
    type: types.MOVE_LAYER,
    payload: { name, to },
  }

  expect(actions.moveLayer(name, to)).toEqual(expectedAction);
});

it('should create an action and toggle the layer\'s visibility', () => {
  const name = 'Layer 1';
  const expectedAction = {
    type: types.TOGGLE_LAYER_VISIBILITY,
    payload: { name },
  }

  expect(actions.toggleLayerVisibility(name)).toEqual(expectedAction);
});
