import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleGrid } from "redux/actions";
import Tool from "ui/canvas/Tool";
import Toggle from "ui/canvas/Toggle";
import { toolbarColor, dividerBorderColor, toolbarHeight } from "resources/styles";
import { mdiPencil, mdiEraser, mdiPail, mdiCursorDefaultOutline, mdiHandRight, mdiMagnify, mdiGrid, mdiGridOff } from "@mdi/js";
import * as tools from "resources/tools";
import * as toggles from "resources/toggles";

const Toolbar = () => {
  const dispatch = useDispatch();
  const showGrid = useSelector(state => state.canvas.showGrid);

  const toggleGridState = () => {
    dispatch(toggleGrid());
  }

  return (
    <nav
      className={`col-start-2 col-end-5 row-start-1 row-end-2 z-20 flex flex-row items-stretch border-b border-r bg-almost-black ${dividerBorderColor} ${toolbarHeight}`}
    >
      <div className="flex flex-row justify-start items-center flex-grow">
        <Tool iconPath={mdiCursorDefaultOutline} tool={tools.DEFAULT_TOOL} />
        <Tool iconPath={mdiPencil} tool={tools.PLACEMENT_TOOL} />
        <Tool iconPath={mdiEraser} tool={tools.ERASER_TOOL} />
        <Tool iconPath={mdiPail} tool={tools.FILL_TOOL} />
        <Tool iconPath={mdiHandRight} tool={tools.PAN_TOOL} />
        <Tool iconPath={mdiMagnify} tool={tools.MAGNIFY_TOOL} />
      </div>

      <div className='flex flex-row justify-end items-center flex-grow'>
        <Toggle
          iconOn={mdiGridOff}
          iconOff={mdiGrid}
          toggle={toggles.TOGGLE_GRID}
          toggled={showGrid}
          onClick={toggleGridState}
        />
      </div>
    </nav>
  );
};

export default Toolbar;
