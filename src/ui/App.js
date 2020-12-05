import WebGLCanvas from 'ui/WebGLCanvas';
import ProjectSidebar from 'ui/sidebar/ProjectSidebar';
import { HashRouter } from "react-router-dom";

const App = () => {
  return (
    <div className='h-screen w-screen flex flex-col text-gray-50 bg-gray-900'>
      <main className='flex-1 grid grid-cols-4'>
        <HashRouter>
          <ProjectSidebar />
        </HashRouter>
        <WebGLCanvas />
      </main>
    </div>
  );
};

export default App;

