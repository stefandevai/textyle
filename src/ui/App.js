import WebGLCanvas from 'ui/WebGLCanvas';
import Toolbar from 'ui/toolbar/Toolbar';
import ProjectSidebar from 'ui/sidebar/ProjectSidebar';
import 'ui/App.sass';

const App = () => {
  return (
    <div className='app'>
      <Toolbar />
      <main style={{ width: '100%', height: '100%', margin: 0 }} className='columns'>
        <WebGLCanvas />
        <ProjectSidebar width='300px' />
      </main>
    </div>
  );
};

export default App;

