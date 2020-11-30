import React, { Component } from 'react';
import FileInput from '../common/file-input';
import TilesetPreview from './tileset-preview';
import { get, set } from 'idb-keyval';

export default class TilesetManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tilesetName: '',
      imageData: null,
    };
  }

  componentDidMount() {
    get('tileset').then(async value => {
      if (!value) {
        return;
      }

      try {
        const data = await toBase64(value);
        this.setState({
          imageData: data,
        });
      } catch (err) {
        console.error(err);
      }
    });
  }

  async onTilesetUpload(event) {
    // Get image data and convert it to base64
    try {
      // TODO: Save array of tilesets to the local storage
      set('tileset', event.target.files[0]);
    } catch (err) {
      console.error(err);
      return;
    }

    this.setState({
      tilesetName: getFileName(event.target.value)
    });

  }

  render() {
    let imageData = null;

    return (
      <>
        <h1>Tileset</h1>
        <FileInput title='Add tileset' filename={this.state.tilesetName} onUpload={(e) => { this.onTilesetUpload(e); }}/>
        { this.state.imageData && <TilesetPreview src={ this.state.imageData } alt='Tileset' /> }
      </>
    );
  }
};

const getFileName = (fullpath) => {
  return fullpath.split('\\').pop().split('/').pop();
}

const toBase64 = (file) => {
  if (!file) {
    return;
  }
  //console.log(typeof(file));
  //console.log(file);

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}

