import React, { Component } from 'react';
import MapSettings from 'ui/sidebar/MapSettings';
import TilesetManager from 'ui/sidebar/TilesetManager';

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
