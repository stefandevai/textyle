import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTileSize } from "redux/actions";
import Tab from "ui/common/Tab";
import TabContent from "ui/common/TabContent";
import Button from "ui/common/Button";

const ProjectSettings = () => {
  const dispatch = useDispatch();
  const currentTileSize = useSelector((state) => state.canvas.tileSize);
  const [tileWidth, setTileWidth] = useState(currentTileSize[0]);
  const [tileHeight, setTileHeight] = useState(currentTileSize[1]);

  const changeTileWidth = (e) => {
    setTileWidth(e.target.value);
  };

  const changeTileHeight = (e) => {
    setTileHeight(e.target.value);
  };

  const updateProject = () => {
    dispatch(setTileSize([parseInt(tileWidth), parseInt(tileHeight)]));
  };

  return (
    <Tab title="Project Settings">
      <TabContent>
        <form>
          <label>
            Global tile dimensions (px):
            <br />
          </label>
          <div className="my-2">
            <input type="number" value={tileWidth} onChange={changeTileWidth} className="w-14 mr-1" />
            <input type="number" value={tileHeight} onChange={changeTileHeight} className="w-14 ml-1" />
          </div>

          <div className='mb-2 flex items-center'>
            <input type="checkbox" name="apply-globally" className='mr-2 bg-green-500' />
            <label htmlFor="apply-globally">Apply to existing layers and tilesets</label>
          </div>

          <Button text="Update project" onClick={updateProject} />
        </form>
      </TabContent>
    </Tab>
  );
};

export default ProjectSettings;
