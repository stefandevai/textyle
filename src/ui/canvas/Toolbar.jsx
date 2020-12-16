import React from "react";
import Tool from "ui/canvas/Tool";
import { dividerBorderColor, toolbarHeight } from "resources/styles";
import { mdiPencil, mdiEraser, mdiPail, mdiCursorDefaultOutline, mdiHandRight, mdiMagnify } from "@mdi/js";
import * as tools from "resources/tools";

const Toolbar = () => {
  return (
    <nav className={`flex flex-row items-stretch bg-black border-b border-r ${dividerBorderColor} ${toolbarHeight}`}>
      <div className="flex flex-row justify-start items-center flex-grow">
        <Tool iconPath={mdiCursorDefaultOutline} tool={tools.DEFAULT_TOOL} />
        <Tool iconPath={mdiPencil} tool={tools.PLACEMENT_TOOL} />
        <Tool iconPath={mdiEraser} tool={tools.ERASER_TOOL} />
        <Tool iconPath={mdiPail} tool={tools.FILL_TOOL} />
        <Tool iconPath={mdiHandRight} tool={tools.PAN_TOOL} />
        <Tool iconPath={mdiMagnify} tool={tools.MAGNIFY_TOOL} />
      </div>
    </nav>
  );
};

export default Toolbar;
