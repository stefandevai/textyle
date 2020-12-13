import { useState } from 'react';
import Tab from 'ui/common/Tab';
import * as formats from 'ui/sidebar/export/formats';
import TilemapInstance from 'tilemap';
import FormatSelector from 'ui/sidebar/export/FormatSelector';
import Button from 'ui/common/Button';

const ExportSettings = () => {
  // ====================================
  // Initialize
  // ====================================
  const [format, setFormat] = useState(formats.FORMAT_TMX);

  // ====================================
  // Logic
  // ====================================
  const onOptionSelected = e => {
    setFormat(e.target.value);
  }

  const handleExport = async () => {
    const rawData = TilemapInstance.dump(format);
    const filename = 'tilemap.' + format;
    const blob = new Blob([rawData], {type : 'application/xml'});
    const a = document.createElement('a');

    a.href = URL.createObjectURL(blob);
    a.download =  filename;
    a.click();
  }

  // ====================================
  // Render
  // ====================================
  return (
    <Tab title='Export Map'>
      <FormatSelector format={format} onOptionSelected={onOptionSelected} />
      <Button text='Export' onClick={handleExport} />
    </Tab>
  );
}
      //<button className='bg-indigo-900 my-3 py-2 px-4 flex justify-center rounded cursor-pointer'
              //onClick={handleExport}
      //>
        //Export
      //</button>

export default ExportSettings;
