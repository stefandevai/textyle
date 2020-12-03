import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addTileset, addTilesets, selectTileset } from 'redux/actions';
import { setTextureFile, getTextureFiles } from 'idb';
import FileInput from 'ui/common/FileInput';
import TilesetPreview from 'ui/sidebar/TilesetPreview';

const TilesetSelector = ({ selectedTileset, tilesetNames, selectTileset }) => {
  // Get last tileset used from localStorage
  useEffect(() => {
    const lastSelectedTileset = localStorage.getItem('lastSelectedTileset');

    // TODO: Check if tileset exists
    if (lastSelectedTileset) {
      selectTileset(lastSelectedTileset);
    }
  }, [selectTileset]);

  const onOptionSelected = e => {
    const name = e.target.value;
    localStorage.setItem('lastSelectedTileset', name);
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

const mapStateToPropsSelector = state => {
  const { selectedTileset, tilesetNames } = state.tileset || {};
  return { selectedTileset, tilesetNames };
}

const ConnectedTilesetSelector = connect(
  mapStateToPropsSelector,
  { selectTileset }
)(TilesetSelector);

const TilesetManager = ({ addTileset, addTilesets }) => {
  // Get available tilesets
  useEffect(() => {
    getTextureFiles().then(textures => {
      addTilesets(textures);
    });
  }, [addTilesets]);

  const onTilesetUpload = async (event) => {
    if (event.target.files.length < 0) {
      return;
    }

    const name = event.target.files[0].name;

    try {
      const fileBlob = event.target.files[0];
      await setTextureFile(name, fileBlob);
    } catch (err) {
      console.error(err);
      return;
    }

    addTileset(name);
  }

  return (
    <div className='is-small'>
      <h3>Tileset</h3>
      <ConnectedTilesetSelector />
      <FileInput title='Add tileset' onUpload={e => onTilesetUpload(e) }/>
      <TilesetPreview />
    </div>
  );
}

export default connect(
  null,
  { addTileset, addTilesets }
)(TilesetManager);

