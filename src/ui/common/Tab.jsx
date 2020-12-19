import { dividerBorderColor, titleBarHeight } from "resources/styles.js";

const Tab = ({ children, title }) => {
  return (
    <div className="flex-1 flex flex-col text-sm">
      <h2 className={`${titleBarHeight} bg-almost-black border-b ${dividerBorderColor} px-2 flex items-center`}>
        {title}
      </h2>
      {children}
    </div>
  );
};

export default Tab;
