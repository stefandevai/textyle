import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { displaySidebar } from "redux/actions";
import { setTab } from "redux/actions";
import { NavLink } from "react-router-dom";
import Icon from "@mdi/react";
import { accentColor, accentTextColor, accentHoverColor, accentTextHoverColor } from "resources/styles";

const TabButton = ({ iconPath, routerPath }) => {
  const dispatch = useDispatch();
  const showSidebar = useSelector((state) => state.canvas.showSidebar);
  const [sameLink, setSameLink] = useState(`#/${routerPath}` === window.location.hash);

  const handleClick = () => {
    const clickOnSameLink = `#/${routerPath}` === window.location.hash;

    setSameLink(clickOnSameLink);

    if (clickOnSameLink) {
      dispatch(displaySidebar(!showSidebar));
    } else if (!showSidebar) {
      dispatch(displaySidebar(true));
    }
  };

  const isActive = (match, location) => {
    return match !== null && showSidebar;
  };

  return (
    <NavLink
      replace={sameLink}
      to={routerPath}
      className="w-full"
      activeClassName={`${accentColor} ${accentTextColor}`}
      isActive={isActive}
    >
      <button
        className={`w-full py-3 flex justify-center ${accentHoverColor} ${accentTextHoverColor}`}
        onClick={handleClick}
        data-tip
        data-for={routerPath}
        data-testid={routerPath}
      >
        <Icon path={iconPath} size={1.0} />
      </button>
    </NavLink>
  );
};

export default TabButton;
