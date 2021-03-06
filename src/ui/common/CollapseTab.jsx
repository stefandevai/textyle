import { useState } from "react";
import { Collapse } from "react-collapse";
import Icon from "@mdi/react";
import { mdiMenuDown, mdiMenuRight } from "@mdi/js";
import { dividerBorderColor, titleBarHeight } from "resources/styles.js";

const CollapseSection = ({ title, children }) => {
  const [open, setOpen] = useState(true);
  const icon = open ? mdiMenuDown : mdiMenuRight;
  const sectionClass = open ? `border-b ${dividerBorderColor}` : "";

  return (
    <div className={sectionClass}>
      <div
        className={`text-xs flex items-center hover:bg-gray-800 cursor-pointer border-b ${dividerBorderColor} ${titleBarHeight}`}
        onDoubleClick={(e) => setOpen(!open)}
      >
        <Icon path={icon} size={1} />

        <h1 className="select-none">{title}</h1>
      </div>

      <Collapse isOpened={open}>
        <div className="text-xs text-gray-300 px-2 py-2">{children}</div>
      </Collapse>
    </div>
  );
};

export default CollapseSection;
