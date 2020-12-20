import * as formats from "resources/formats";
import Select from "ui/common/Select";

const FormatSelector = ({ format, onOptionSelected }) => {
  const formatsArray = [formats.FORMAT_JSON];

  const formatOptions = formatsArray.map((format) => (
    <option key={format} value={format}>
      {format}
    </option>
  ));

  return <Select value={format} options={formatOptions} onChange={onOptionSelected} />;
};

export default FormatSelector;
