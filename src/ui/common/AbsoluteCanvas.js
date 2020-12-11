import { forwardRef } from 'react';

const AbsoluteCanvas = forwardRef(({ id, style, onMouseDown, onMouseMove, onMouseUp, onWheel, onDragStart, onDrag }, ref) => (
  // ====================================
  // Render
  // ====================================
  <canvas id={id}
          style={{...style, position: 'absolute', top: '0', left: '0'}}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onWheel={onWheel}
          onDragStart={onDragStart}
          onDrag={onDrag}
          draggable='true'
          ref={ref}/>
));

export default AbsoluteCanvas;
