import { useState } from 'react';
import Slider from 'ui/common/SliderInput';

const MapSettings = (props) => {
  const [tileSize, setTileSize] = useState(32);

  return (
    <div>
      <h3>Map</h3>
      <Slider title="Tile size" onChange={e => setTileSize(e.target.value)} value={tileSize} />
    </div>
  );
}

export default MapSettings;
