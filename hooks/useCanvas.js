import canvasSketch from 'canvas-sketch';
import { useEffect, useState } from 'react';

const useCanvas = (props) => {
  const [sketch] = useState(props.sketch);

  useEffect(() => {
    // ! temporarily
    if (!window.canvas) {
      window.canvas = document.getElementById('canvas');
    }

    let manager;

    async function start() {
      manager = await canvasSketch(sketch, {
        canvas: window.canvas,
        animate: true,
      });
    }
    start();

    return () => {
      // clear canvas before changing route
      const context = window.canvas.getContext('2d');
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      context.globalAlpha = 1;

      // Unload previous canvas sketch
      // console.log('manager', manager);
      manager?.unload();
    };
  // eslint-disable-next-line
  }, []);
};

export default useCanvas;
