import { useEffect } from 'react';
import { connect } from 'react-redux';
import { selectTileset } from 'redux/actions';
import {
  LOCAL_STORAGE_LAST_SELECTED_TILESET,
} from 'ui/constants';

const TilesetSelector = ({ selectedTileset, tilesetNames, selectTileset }) => {
  // Get last tileset used from localStorage
  useEffect(() => {
    const lastSelectedTileset = localStorage.getItem(LOCAL_STORAGE_LAST_SELECTED_TILESET);

    // TODO: Check if tileset exists
    if (lastSelectedTileset) {
      selectTileset(lastSelectedTileset);
    }
  }, [selectTileset]);

  const onOptionSelected = e => {
    const name = e.target.value;
    localStorage.setItem(LOCAL_STORAGE_LAST_SELECTED_TILESET, name);
    selectTileset(name);
  }

  const options = [];

  for (const [index, value] of tilesetNames.entries()) {
    options.push(<option value={value} key={index}>{value}</option>);
  }

  return (
    tilesetNames.length > 0 &&
    <select value={selectedTileset} onChange={onOptionSelected}>
      {options}
    </select>
  );
}

const mapStateToProps = state => {
  const { selectedTileset, tilesetNames } = state.tileset || {};
  return { selectedTileset, tilesetNames };
}

export default connect(
  mapStateToProps,
  { selectTileset }
)(TilesetSelector);
