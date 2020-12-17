import { NavLink } from "react-router-dom";
import Icon from "@mdi/react";
import { accentColor, accentTextColor, accentHoverColor, accentTextHoverColor } from "resources/styles";

const TabButton = ({ iconPath, routerPath }) => {
  return (
    <NavLink to={routerPath} className='w-full' activeClassName={`${accentColor} ${accentTextColor}`}>
      <button className={`w-full py-3 flex justify-center ${accentHoverColor} ${accentTextHoverColor}`} data-tip data-for={routerPath}>
        <Icon path={iconPath} size={1.0} />
      </button>
    </NavLink>
  );
};

export default TabButton;
