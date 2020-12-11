import * as formats from 'ui/sidebar/export/formats';

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
    <select
      className='text-gray-900'
      value={format}
      onChange={onOptionSelected}>
      {formatOptions} 
    </select>
  );
}

export default FormatSelector;
