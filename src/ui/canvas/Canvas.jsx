import Toolbar from "ui/canvas/Toolbar";
import WebGLCanvas from "ui/canvas/WebGLCanvas";
import EditorCanvas from "ui/canvas/EditorCanvas";

const Canvas = () => {
  return (
    <div className="col-span-3 flex flex-col">
      <Toolbar />
      <section className="grid flex-1 bg-gray-600">
        <EditorCanvas />
        <WebGLCanvas />
      </section>
    </div>
  );
};

export default Canvas;
