import { forwardRef } from 'react';

const AbsoluteCanvas = forwardRef(({ id, style, onMouseUp}, ref) => (
  <canvas id={id} style={{...style, position: 'absolute', top: '0', left: '0'}} onMouseUp={onMouseUp} ref={ref}/>
));

export default AbsoluteCanvas;
    //<canvas id={id}
            //style={{ border: border,
                     //position: 'absolute',
                     //width: '100%',
                     //height: '100%',
                     //left: 0,
                     //top: 0,
                     //zIndex: zIndex }}
            //onMouseUp={onMouseUp}
            //ref={ref}/>
