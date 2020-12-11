import Toolbar from 'ui/toolbar/Toolbar';
import WebGLCanvas from 'ui/canvas/WebGLCanvas';
import EditorCanvas from 'ui/canvas/EditorCanvas';

const Canvas = () => {
  // ====================================
  // Render
  // ====================================
  return (
    <div className='col-span-3 flex flex-col'>
      <Toolbar />
      <section className='relative flex-1 bg-gray-600'>
        <EditorCanvas />
        <WebGLCanvas />
      </section>
    </div>
  );
}

export default Canvas;
