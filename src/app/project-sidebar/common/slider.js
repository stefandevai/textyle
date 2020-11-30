import React, { Component } from 'react';

export default class Slider extends Component {
  render() {
    return (
      <div>
        <h4>{ this.props.title }</h4>
        <span>{ this.props.value }px</span>
        <input
          type="range"
          min="1"
          max="100"
          value={this.props.value}
          onChange={this.props.onChange} />
      </div>
    );
  }
};


