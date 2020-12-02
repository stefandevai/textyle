import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getTextureBlob } from 'idb';

const TilesetPreview = ({ currentTileset }) => {
  useEffect(() => {
    const canvas = document.getElementById('tileset-canvas');
    const context = canvas.getContext('2d');

    if (!currentTileset) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    // Add image to canvas
    getTextureBlob(currentTileset).then(file => {
      const reader = new FileReader();

      reader.onload = e => {
        const image = new Image();
        image.onload = () => {
          canvas.width = image.width;
          canvas.height = image.height;
          context.drawImage(image, 0, 0);
        }
        image.src = e.target.result;
      }
      reader.readAsDataURL(file);
    });
  }, [currentTileset]);

  return (
    <canvas id='tileset-canvas' />
  );
}

const mapStateToProps = state => {
  const { currentTileset } = state.tileset || {};
  return { currentTileset };
}

export default connect(mapStateToProps)(TilesetPreview);
