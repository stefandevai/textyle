import { dividerBorderColor, titleBarHeight } from './styles.js';

const Tab = ({ children, title }) => {
  return (
    <div>
      <h2 className={`${titleBarHeight} bg-black border-b ${dividerBorderColor} px-2 flex items-center`}>
        {title}
      </h2>
      {children}
    </div>
  );
}

export default Tab;
