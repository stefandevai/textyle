import React, { Component } from 'react';
import MapSettings from './map-settings';
import TilesetManager from './tileset-manager';

export default class ProjectSidebar extends Component {
  render() {
    return (
      <div style={{ width: this.props.width }}>
        <MapSettings />
        <TilesetManager />
      </div>
    );
  }
};
