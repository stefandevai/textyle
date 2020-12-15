import { connect, useDispatch, useSelector } from "react-redux";
import { selectTool } from "redux/actions";
import ReactTooltip from "react-tooltip";
import Icon from "@mdi/react";
import tooltips from "resources/tooltips";
import * as testIds from "resources/testIds";
import { TOOLTIP_DELAY, TOOLBAR_ICON_SIZE } from "ui/constants";

const Tool = ({ iconPath, tool }) => {
  // ====================================
  // Initialize
  // ====================================
  const dispatch = useDispatch();
  const selectedTool = useSelector((state) => state.canvas.selectedTool);

  // ====================================
  // Logic
  // ====================================
  const handleOnClick = () => {
    dispatch(selectTool(tool));
  };

  // ====================================
  // Render
  // ====================================
  const iconClasses =
    tool === selectedTool ? "text-indigo-400 hover:text-indigo-500" : "hover:text-indigo-500 cursor-pointer";
  return (
    <button
      className="px-4 py-2 cursor-default"
      role="button"
      data-testid={tool === selectedTool ? testIds.SELECTED_TOOL : ""}
    >
      <div className={iconClasses} onClick={handleOnClick} data-tip data-for={tool} data-testid={tool}>
        <Icon path={iconPath} size={TOOLBAR_ICON_SIZE} />
      </div>
      <ReactTooltip id={tool} place="bottom" effect="solid" delayShow={TOOLTIP_DELAY}>
        {tooltips.get(tool)}
      </ReactTooltip>
    </button>
  );
};

export default Tool;
