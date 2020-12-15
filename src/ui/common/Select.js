import { SELECT_TAG } from "resources/testIds";

const Select = ({ value, options, onChange }) => {
  return (
    <select
      className="text-gray-400 w-full px-1 py-1 bg-gray-800 hover:bg-gray-700 hover:text-white border border-gray-700 rounded-sm"
      value={value}
      onChange={onChange}
      data-testid={SELECT_TAG}
    >
      {options}
    </select>
  );
};

export default Select;
