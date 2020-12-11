import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTileset } from 'redux/actions';
import { LOCAL_STORAGE_LAST_SELECTED_TILESET } from 'ui/constants';

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
  for (const [index, value] of tilesetNames.entries()) {
    options.push(<option value={value} key={index}>{value}</option>);
  }

  return (
    tilesetNames.length > 0 &&
    <select
      className='text-gray-900'
      value={selectedTileset}
      onChange={onOptionSelected}>
      {options}
    </select>
  );
}

export default TilesetSelector;
