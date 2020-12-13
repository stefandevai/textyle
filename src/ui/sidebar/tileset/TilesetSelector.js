import { useEffect } from 'react';
import Select from 'react-select';
import { useSelector, useDispatch } from 'react-redux';
import { selectTileset } from 'redux/actions';
import { LOCAL_STORAGE_LAST_SELECTED_TILESET } from 'ui/constants';
import * as testIds from 'resources/testIds';

const TilesetSelector = () => {
  // ====================================
  // Initialize
  // ====================================
  const dispatch = useDispatch();
  const { selectedTileset, tilesetNames } = useSelector(state => state.tileset);

  // ====================================
  // Logic
  // ====================================
  // Get last tileset used from localStorage
  useEffect(() => {
    const lastSelectedTileset = localStorage.getItem(LOCAL_STORAGE_LAST_SELECTED_TILESET);

    // TODO: Check if tileset exists
    if (lastSelectedTileset) {
      dispatch(selectTileset(lastSelectedTileset));
    }
  }, [dispatch]);

  const onOptionSelected = e => {
    const name = e.target.value;
    localStorage.setItem(LOCAL_STORAGE_LAST_SELECTED_TILESET, name);
    dispatch(selectTileset(name));
  }

  // ====================================
  // Render
  // ====================================
  const options = [];
  for (const value of tilesetNames) {
    options.push(<option value={value} key={value} data-testid={value}>{value}</option>);
  }

  return (
    tilesetNames.length > 0 &&
    <select
      className='text-gray-400 w-full px-1 py-1 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-sm'
      value={selectedTileset}
      onChange={onOptionSelected}
      data-testid={testIds.SELECT_TILESET}
    >
      {options}
    </select>
  );
}

export default TilesetSelector;
