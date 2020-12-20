import ReactTooltip from "react-tooltip";
import Icon from "@mdi/react";
import tooltips from "resources/tooltips";
import { TOOLTIP_DELAY, TOOLBAR_ICON_SIZE } from "ui/constants";

const Toggle = ({ iconOn, iconOff, toggle, toggled, onClick }) => {
  const iconClasses = toggled ? "text-green-400 hover:text-green-500 cursor-pointer" : "hover:text-green-500 cursor-pointer";
  const iconPath = toggled ? iconOn : iconOff;

  return (
    <button
      className="px-3 py-2 cursor-default"
      role="button"
    >
      <div className={iconClasses} onClick={onClick} data-tip data-for={toggle} data-testid={toggle}>
        <Icon path={iconPath} size={TOOLBAR_ICON_SIZE} />
      </div>
      <ReactTooltip id={toggle} place="bottom" effect="solid" delayShow={TOOLTIP_DELAY}>
        {tooltips.get(toggle)}
      </ReactTooltip>
    </button>
  );
};

export default Toggle;
