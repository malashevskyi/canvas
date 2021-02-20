import React from 'react'
import random from 'canvas-sketch-util/random';
import palettes from 'nice-color-palettes';
import * as d3 from 'd3';

import Numb from './Numb';
import { useCanvas } from './../../hooks/useCanvas';

d3.select('head')
.append('link')
.attr('rel', 'stylesheet')
.attr('href', 'https://fonts.googleapis.com/css2?family=Potta+One&display=swap');
  
const sketch = ({ context, width, height }) => {
  random.setSeed(1);

  const palette = random.pick(palettes);
  const numbs = [];
  let tick = 0;

  function addNumber() {
    if (numbs.length < 50 && tick % 10 === 0) {
      numbs.push(new Numb(context, palette));
    }
  }

  return (props) => {
    ({ width, height } = props);
    tick++;

    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    addNumber();

    context.save();
    context.translate(width / 2, height - 50);
    for (let i = 0; i < numbs.length; i++) {
      const numb = numbs[i];
      if (numb.tick > 300) {
        numb.initial();
      }
      numb.render();
    }
    context.restore();
  };
};

const Canvas = React.forwardRef((props, ref) => {
  const canvas = ref.current;
  useCanvas({ canvas, sketch });

  return '';
});

export default Canvas;