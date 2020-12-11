import { useState } from 'react';
import Slider from 'ui/common/SliderInput';

const MapSettings = (props) => {
  // ====================================
  // Initialize
  // ====================================
  const [tileSize, setTileSize] = useState(32);

  // ====================================
  // Render
  // ====================================
  return (
    <div>
      <h3>Map</h3>
      <Slider title="Tile size" onChange={e => setTileSize(e.target.value)} value={tileSize} />
    </div>
  );
}

export default MapSettings;
