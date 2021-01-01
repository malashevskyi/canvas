import canvasSketch from 'canvas-sketch';
import React, { useEffect } from 'react';

export default function setSketch(sketch, settings) {
  return React.forwardRef((props, ref) => {
    useEffect(() => {      
      canvasSketch(sketch, {
        canvas: ref.current,
        ...settings
      })
    }, [ref])
    
    return '';
  })
}
