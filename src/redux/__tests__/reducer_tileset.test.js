import * as types from '../actionTypes';
import reducer from '../reducers/tileset';

it('should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual({
    tilesetNames: [],
    selectedTileset: '',
    selectedTile: -1,
  });
});

it('should handle ADD_TILESET', () => {
  let state = reducer(undefined, {
    type: types.ADD_TILESET,
    payload: { name: 'tileset1' }
  });
  expect(state.selectedTileset).toEqual('tileset1');
  expect(state.tilesetNames).toEqual(['tileset1']);

  state = reducer(state, {
    type: types.ADD_TILESET,
    payload: { name: 'tileset2' }
  });
  expect(state.selectedTileset).toEqual('tileset2');
  expect(state.tilesetNames).toEqual(['tileset1', 'tileset2']);
});

it('should handle ADD_TILESETS', () => {
  let state = reducer(undefined, {
    type: types.ADD_TILESETS,
    payload: { names: ['tileset1', 'tileset2'] }
  });
  expect(state.selectedTileset).toEqual('');
  expect(state.tilesetNames).toEqual(['tileset1', 'tileset2']);
});

it('should handle SELECT_TILESET', () => {
  let state = reducer(undefined, {
    type: types.ADD_TILESETS,
    payload: { names: ['tileset1', 'tileset2'] }
  });
  expect(state.selectedTileset).toEqual('');
  expect(state.tilesetNames).toEqual(['tileset1', 'tileset2']);

  state = reducer(state, {
    type: types.SELECT_TILESET,
    payload: { name: 'tileset2' }
  });
  expect(state.selectedTileset).toEqual('tileset2');
});

it('should handle SELECT_TILE', () => {
  let state = reducer(undefined, {
    type: types.SELECT_TILE,
    payload: { value: 19 }
  });
  expect(state.selectedTile).toEqual(19);
});