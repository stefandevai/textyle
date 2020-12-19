import Canvas from "ui/canvas/Canvas";
import Sidebar from "ui/sidebar/Sidebar";
import Toolbar from "ui/canvas/Toolbar";
import { HashRouter } from "react-router-dom";
import { dividerBorderColor } from "resources/styles";

const App = () => {
  return (
    <div
      className={`h-screen w-screen flex flex-col bg-gray-900 border-l border-t ${dividerBorderColor} text-gray-100`}
    >
      <main
        className="flex-1 grid grid-cols-4"
        style={{
          gridTemplateRows: "1.75rem 1fr",
          gridTemplateColumns: "auto 1fr 1fr 1fr",
        }}
      >
        <div className="col-start-1 col-end-2 row-start-1 row-end-3 z-20 flex">
          <HashRouter className="flex-1">
            <Sidebar />
          </HashRouter>
        </div>
        <Toolbar />
        <Canvas />
      </main>
    </div>
  );
};

export default App;
