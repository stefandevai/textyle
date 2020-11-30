import React, { Component } from 'react';
import FileInput from '../common/file-input';
import TilesetPreview from './tileset-preview';

export default class TilesetManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tilesetName: '',
    };
  }

  async onTilesetUpload(event) {
    // Get image data and convert it to base64
    try {
      // TODO: Save array of tilesets to the local storage
      const imageData = await toBase64(event.target.files[0]);
      localStorage.setItem('tileset', imageData);
    } catch (err) {
      console.error(err);
      return;
    }

    this.setState({
      tilesetName: getFileName(event.target.value)
    });
  }

  render() {
    return (
      <>
        <h1>Tileset</h1>
        <FileInput title='Add tileset' filename={this.state.tilesetName} onUpload={(e) => { this.onTilesetUpload(e); }}/>
        { localStorage['tileset'] && <TilesetPreview src={ localStorage.getItem('tileset') } alt='Tileset' /> }
      </>
    );
  }
};

const getFileName = (fullpath) => {
  return fullpath.split('\\').pop().split('/').pop();
}

const toBase64 = (filepath) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(filepath);
  });
}

