import * as formats from 'ui/sidebar/export/formats';
import Select from 'ui/common/Select';

const FormatSelector = ({ format, onOptionSelected }) => {
  // ====================================
  // Initialize
  // ====================================
  const formatsArray = [
    formats.FORMAT_JSON,
    formats.FORMAT_TMX,
  ];

  // ====================================
  // Render
  // ====================================
  const formatOptions = formatsArray.map(format => <option key={format} value={format}>{format}</option>);

  return (
    <Select value={format} options={formatOptions} onChange={onOptionSelected} />
  );
}

export default FormatSelector;
