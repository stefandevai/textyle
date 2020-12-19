export const getLayersState = (state) => state.layers;

export const getLayersNames = (state) => (getLayersState(state) ? getLayersState(state).names : []);

export const getLayerByName = (state, name) =>
  getLayersState(state) ? { ...getLayersState(state).layers[name], name } : {};

export const getLayers = (state) => getLayersNames(state).map((name) => getLayerByName(state, name));

export const getLayersByAddedTime = (state) => getLayers(state).reverse();

export const getVisibleLayers = (state) => {
  const layersState = getLayersState(state);
  return layersState.names.filter((name) => layersState.layers[name].visible).reverse();
};

