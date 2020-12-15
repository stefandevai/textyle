export const getTilePositionOnClick = (e, tileSize, offset) => {
  offset = offset || [0.0, 0.0];
  const bounds = e.target.getBoundingClientRect();
  const w = Math.floor(e.target.width / tileSize[0]);
  const x = Math.floor((e.clientX + offset[0] - bounds.left) / tileSize[0]);
  const y = Math.floor((e.clientY + offset[1] - bounds.top) / tileSize[1]);
  return [x, y];
};

export const getTileUV = (frame, frameSize, textureSize) => {
  // TODO: Better handling of out of bounds frame sizes
  if (frameSize[0] >= textureSize[0] || frameSize[1] >= textureSize[1]) {
    return [
      [0.0, 0.0],
      [0.0, 0.0],
      [0.0, 0.0],
      [0.0, 0.0],
    ];
  }

  const frameWidth = (frameSize[0] * 1.0) / textureSize[0];
  const frameHeight = (frameSize[1] * 1.0) / textureSize[1];
  const hFrames = Math.floor(textureSize[0] / frameSize[0]);
  const vFrames = Math.floor(textureSize[1] / frameSize[1]);
  const maxFrames = hFrames * vFrames;

  const frameX = Math.floor(frame % hFrames);
  const frameY = Math.floor((frame % maxFrames) / hFrames);
  // Multiply the x coord of the frame in the texture atlas by the normalized value of the width one frame.
  const topLeftX = (frameX * (textureSize[0] / hFrames) * 1.0) / textureSize[0];
  // Multiply the y coord of the frame in the tile map by the normalized value of the height one frame.
  // Invert the value as the y axis is upwards for OpenGL
  const topLeftY = (frameY * (textureSize[1] / vFrames)) / textureSize[1];

  return [
    [topLeftX, topLeftY], // top-left
    [topLeftX + frameWidth, topLeftY], // top-right
    [topLeftX + frameWidth, topLeftY + frameHeight], // bottom-right
    [topLeftX, topLeftY + frameHeight], // bottom-left
  ];
};
