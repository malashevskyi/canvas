import canvasSketch from 'canvas-sketch';
import { useEffect } from 'react';

export default function setSketch(sketch, settings) {
  return () => {    
    useEffect(() => {
      let previousCanvas = document.querySelector('body > canvas');
      previousCanvas?.remove();
      
      canvasSketch(sketch, settings);
      
      return () => {
        // Clear interval from another route if exists,
        // otherwise intervals will multiply
        clearInterval(window.interval);
      };
    }, []);

    return '';
  };
}
