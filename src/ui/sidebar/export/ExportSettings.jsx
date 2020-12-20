import { useState } from "react";
import Tab from "ui/common/Tab";
import TabContent from "ui/common/TabContent";
import * as formats from "resources/formats";
import TilemapInstance from "tilemap";
import FormatSelector from "ui/sidebar/export/FormatSelector";
import Button from "ui/common/Button";

const ExportSettings = () => {
  const [format, setFormat] = useState(formats.FORMAT_JSON);

  const onOptionSelected = (e) => {
    setFormat(e.target.value);
  };

  const handleExport = async () => {
    const rawData = await TilemapInstance.export(format);
    const filename = "tilemap." + format;
    const blob = new Blob([rawData], { type: "application/json" });
    const a = document.createElement("a");

    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
  };

  return (
    <Tab title="Export Map">
      <TabContent>
        <div className='mb-2'>
          <FormatSelector format={format} onOptionSelected={onOptionSelected} />
        </div>
        <Button text="Export" onClick={handleExport} />
      </TabContent>
    </Tab>
  );
};

export default ExportSettings;
