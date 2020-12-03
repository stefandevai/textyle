export const getTilePositionOnClick = (e, tileSize) => {
  const bounds = e.target.getBoundingClientRect();
  const w = Math.floor(e.target.width / tileSize[0]);
  const x = Math.floor((e.clientX - bounds.left) / tileSize[0]);
  const y = Math.floor((e.clientY - bounds.top) / tileSize[1]);
  return [x, y];
}

