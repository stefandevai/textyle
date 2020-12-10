import { useState } from 'react';
import * as formats from 'ui/sidebar/export/formats';
import GridInstance from 'tilemap';

const FormatSelector = ({ format, onOptionSelected }) => {
  const formatsArray = [
    formats.FORMAT_JSON,
    formats.FORMAT_TMX,
  ];

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

const ExportSettings = () => {
  const [format, setFormat] = useState(formats.FORMAT_TMX);

  const onOptionSelected = e => {
    setFormat(e.target.value);
  }

  const handleExport = async () => {
    const rawData = GridInstance.dump(format);
    const filename = 'tilemap.' + format;
    console.log(rawData);

    const blob = new Blob([rawData], {type : 'application/xml'});
    const a = document.createElement('a');

    a.href = URL.createObjectURL(blob);
    a.download =  filename;
    a.click();
  }

  return (
    <div>
      <h3>Export</h3>
      <FormatSelector format={format} onOptionSelected={onOptionSelected} />
      <button className='bg-indigo-900 my-3 py-2 px-4 flex justify-center rounded cursor-pointer'
              onClick={handleExport}>
        Export
      </button>
    </div>
  );
}

export default ExportSettings;

