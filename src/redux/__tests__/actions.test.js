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
