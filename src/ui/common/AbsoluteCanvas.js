import { forwardRef } from 'react';

const AbsoluteCanvas = forwardRef(({ id, style, onMouseUp }, ref) => (
  <canvas id={id} style={{...style, position: 'absolute', top: '0', left: '0'}} onMouseUp={onMouseUp} ref={ref}/>
));

export default AbsoluteCanvas;
