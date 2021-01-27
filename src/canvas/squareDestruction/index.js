import random from 'canvas-sketch-util/random';
import palettes from 'nice-color-palettes';

import setSketch from '../../utils/setSketch';
import Square from './Square';

window.SquareDestruction = {
  points: []
};


const sketch = ({ context, width, height }) => {
  random.setSeed(33)
  const palette = random.pick(palettes);
  const points = window.SquareDestruction.points;
  let maxSide = Math.max(width, height);

  function getSquares() {
    for (let y = 0; y < 200; y += 10) {
      for (let x = 0; x < 200; x += 10) {
        window.SquareDestruction.points.push(new Square(context, maxSide, [x, y], random.pick(palette)))
      }
    }
  }
  if (points.length === 0) {
    getSquares();
  }

  return {
    render(props) {
      ({height, width} = props)
      
      context.fillStyle = 'rgb(20, 20, 20)';
      context.fillRect(0, 0, width, height);
      context.translate(width / 2 - 100, height / 2 - 100);

      for (let i = 0; i < points.length; i++) {
        points[i].render();
        points[i].tlx.play();
        points[i].tly.play();
      }
    }
  }
};

export default setSketch(
  sketch,
  { animate: true }
);