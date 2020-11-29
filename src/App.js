import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wasm: {}
    };
  }

  componentDidMount() {
    this.loadWasm();
  }

  loadWasm = async () => {
    try {
      const wasm = await import('./canvas-wasm');
      this.setState({wasm});
    } catch (err) {
      console.error(`[x] Error loading canvas wasm: ${err.message}`);
    }
  }

  render() {
    const { wasm = {} } = this.state;

    if (wasm.greet) {
      //wasm.greet();
    }

    return (
      <div className="App">
      </div>
    );
  }
}

export default App;
