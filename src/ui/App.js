import Canvas from "ui/canvas/Canvas";
import Sidebar from "ui/sidebar/Sidebar";
import { HashRouter } from "react-router-dom";
import { dividerBorderColor } from "resources/styles";

const App = () => {
  // ====================================
  // Render
  // ====================================
  return (
    <div
      className={`h-screen w-screen flex flex-col text-gray-50 bg-gray-900 border-l border-t ${dividerBorderColor} text-gray-100`}
    >
      <main className="flex-1 grid grid-cols-4">
        <HashRouter>
          <Sidebar />
        </HashRouter>
        <Canvas />
      </main>
    </div>
  );
};

export default App;
