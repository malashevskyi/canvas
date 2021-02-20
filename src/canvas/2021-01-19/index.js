import React from 'react'

import Circle from './Circle';
import getGui from '../../utils/getGui';
import { debounceNotification } from '../../utils/debounce';
import { useCanvas } from './../../hooks/useCanvas';

const sketch = ({ canvas, context, width, height }) => {
  debounceNotification('Move mouse to change position.');
  
  const opt = {
    radius: 40,
    trailLength: 15
  }
  let xPos = width / 2;
  let yPos = height / 2;
  let circles = Array(opt.trailLength).fill('');

  function storeLastPosition(xPos, yPos) {
    circles.unshift(new Circle(context, xPos, yPos, opt.radius));
    circles.pop();
  }

  function styleRect() {
    context.clearRect(0, 0, width, height);
    context.fillStyle = `hsl(${250}, 50%, 50%)`;
    context.fillRect(0, 0, width, height);
  }

  function mouseMoveHandler(e) {
    xPos = (height / canvas.offsetHeight) * e.offsetX;
    yPos = (width / canvas.offsetWidth) * e.offsetY;
  }
  function touchMoveHandler(e) {
    e.preventDefault();
    xPos = e.changedTouches[0].clientX;
    yPos = e.changedTouches[0].clientY;
  }
  canvas.addEventListener('mousemove', mouseMoveHandler);
  canvas.addEventListener('touchmove', touchMoveHandler);

  getGui((gui) => {
    gui.add(opt, 'radius').step(1).min(10).max(100).name('Radius')
    gui.add(opt, 'trailLength').step(1).min(10).max(100).name('Count').onChange(() => {
      circles = Array(opt.trailLength).fill('');
    })
  })

  return (props) => {
    ({ height, width } = props);
    styleRect();
    circles.forEach((circle, i) => {
      let radius = (i + 1) / circles.length;
      circle.draw?.(
        radius,
        `hsl(${250 + 5 * i}, 50%, 50%)`
      );
    });
    storeLastPosition(xPos, yPos);
  };
};

const Canvas = React.forwardRef((props, ref) => {
  const canvas = ref.current;
  useCanvas({ canvas, sketch });

  return '';
});

export default Canvas;