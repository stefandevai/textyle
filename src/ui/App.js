import React, { Component } from 'react';
import WebGLCanvas from 'ui/WebGLCanvas';
import Toolbar from 'ui/toolbar/Toolbar';
import ProjectSidebar from 'ui/sidebar/ProjectSidebar';
import 'ui/App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Toolbar />
        <main style={{ width: '100%', height: '100%', display: 'flex' }}>
          <WebGLCanvas />
          <ProjectSidebar width='300px' />
        </main>
      </div>
    );
  }
};

export default App;

// WASM
  //constructor(props) {
    //super(props);

    ////this.state = {
      ////wasm: {}
    ////};
  //}

  //componentDidMount() {
    //this.loadWasm();
  //}

  //loadWasm = async () => {
    //try {
      //const wasm = await import('./canvas-wasm');
      //this.setState({wasm});
    //} catch (err) {
      //console.error(`[x] Error loading canvas wasm: ${err.message}`);
    //}
  //}

// In render()
    //const { wasm = {} } = this.state;

    //if (wasm.greet) {
      ////wasm.greet();
    //}

