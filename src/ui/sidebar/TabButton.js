import { NavLink } from "react-router-dom";
import Icon from "@mdi/react";

const TabButton = ({ iconPath, routerPath }) => {
  // ====================================
  // Render
  // ====================================
  return (
    <NavLink to={routerPath} activeClassName="text-indigo-200 bg-indigo-900">
      <button className="px-2 py-3 hover:text-indigo-400 hover:bg-indigo-900" data-tip data-for={routerPath}>
        <Icon path={iconPath} size={1.2} />
      </button>
    </NavLink>
  );
};

export default TabButton;
