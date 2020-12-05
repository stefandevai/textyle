import { forwardRef } from 'react';

const AbsoluteCanvas = forwardRef(({ id, style, onMouseDown, onMouseMove, onMouseUp }, ref) => (
  <canvas id={id} style={{...style, position: 'absolute', top: '0', left: '0'}} onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} ref={ref}/>
));

export default AbsoluteCanvas;
