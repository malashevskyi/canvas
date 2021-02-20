import React from 'react'
import Square from './Square';

import { useCanvas } from './../../hooks/useCanvas';

const sketch = ({ context, width, height }) => {
  const points = [];
  let tick = 0;

  for (let y = 0; y < 200; y += 5) {
    for (let x = 0; x < 200; x += 5) {
      points.push([x, y])
    }
  }

  context.clearRect(0, 0, width, height)

  return (props) => {
    ({ width, height } = props);

    context.translate(width / 2 - 200, height / 2 - 200);
    context.scale(2, 2)

    if (tick > points.length - 1) {

      const square = new Square({ context, xy: points[tick % points.length] });
      square.render(true);
      if (tick > points.length * 2) tick = -1;
      
    } else {
      
      const square = new Square({ context, xy: points[tick] });
      square.render();

    }

    tick++;
  };
};

const Canvas = React.forwardRef((props, ref) => {
  const canvas = ref.current;
  useCanvas({ canvas, sketch });

  return '';
});

export default Canvas;