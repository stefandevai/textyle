import { SELECTED_TILE_COLOR_OVERLAY } from "ui/constants";

export const getTilePositionOnClick = (e, tileSize, offset) => {
  offset = offset || [0.0, 0.0];
  const bounds = e.target.getBoundingClientRect();
  const w = Math.floor(e.target.width / tileSize[0]);
  const x = Math.floor((e.pageX + offset[0] - bounds.left) / tileSize[0]);
  const y = Math.floor((e.pageY + offset[1] - bounds.top) / tileSize[1]);
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

export const drawOutline = ({ context, width, height, color, dashed = false, offset = [0, 0] }) => {
  //const context = canvas.getContext("2d");
  context.strokeStyle = color;
  context.lineWidth = 1;
  if (dashed) {
    context.setLineDash([4, 2]);
  }

  // Top
  context.beginPath();
  context.moveTo(offset[0], offset[1] + 0.5);
  context.lineTo(width + offset[0], offset[1] + 0.5);
  context.stroke();

  // Bottom
  context.beginPath();
  context.moveTo(offset[0], height + offset[1] + 0.5);
  context.lineTo(width + offset[0], height + offset[1] + 0.5);
  context.stroke();

  // Left
  context.beginPath();
  context.moveTo(offset[0] + 0.5, offset[1]);
  context.lineTo(offset[0] + 0.5, height + offset[1]);
  context.stroke();

  // Right
  context.beginPath();
  context.moveTo(width + offset[0] + 0.5, offset[1]);
  context.lineTo(width + offset[0] + 0.5, height + offset[1]);
  context.stroke();
};

export const drawGrid = ({ context, width, height, tileSize, color, dashed = false, offset = [0, 0] }) => {
  //const context = canvas.getContext("2d");
  context.strokeStyle = color;
  context.lineWidth = 1;
  if (dashed) {
    context.setLineDash([4, 2]);
  }

  // Draw horizontal lines
  for (let j = tileSize[1] + offset[1]; j < height + offset[1]; j += tileSize[1]) {
    context.beginPath();
    context.moveTo(offset[0], j + 0.5);
    context.lineTo(width + offset[0], j + 0.5);
    context.stroke();
  }

  // Draw vertical lines
  for (let i = tileSize[0] + offset[0]; i < width + offset[0]; i += tileSize[0]) {
    context.beginPath();
    context.moveTo(i + 0.5, offset[1]);
    context.lineTo(i + 0.5, height + offset[1]);
    context.stroke();
  }
};

export const drawTilePlaceholder = ({ canvas, position, tileSize }) => {
  const context = canvas.getContext("2d");

  // Draw square on selected tile
  context.fillStyle = SELECTED_TILE_COLOR_OVERLAY;
  context.fillRect(position[0] * tileSize[0] + 1, position[1] * tileSize[1] + 1, tileSize[0] - 1, tileSize[1] - 1);
};
