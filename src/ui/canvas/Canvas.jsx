import WebGLCanvas from "ui/canvas/WebGLCanvas";
import EditorCanvas from "ui/canvas/EditorCanvas";

const Canvas = () => {
  return (
    <div className="col-span-full row-span-full flex flex-col">
      <section className="grid flex-1 bg-gray-600">
        <EditorCanvas />
        <WebGLCanvas />
      </section>
    </div>
  );
};

export default Canvas;
