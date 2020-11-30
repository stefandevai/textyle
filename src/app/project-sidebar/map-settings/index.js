import React, { Component } from 'react';
import Slider from '../common/slider';

export default class MapSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tileSize: 32,
    };
  }

  onTileSizeChange(event) {
    this.setState({
      tileSize: event.target.value
    });
  }

  render() {
    return (
      <>
        <h1>Map settings</h1>
        <Slider title="Tile size" onChange={ (e) => this.onTileSizeChange(e) } value={ this.state.tileSize } />
      </>
    );
  }
};

