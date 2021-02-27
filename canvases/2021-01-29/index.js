

import { useCanvas } from '../../hooks/useCanvas';
import Square from './Square';

const sketch = ({ gui }) => {
  return ({ context, width, height }) => {
    const points = [];
    const count = 1000;
    let outerPoints = [];

    for (let i = 0; i <= count / 4; i++) {
      outerPoints.push([i, 0]);
      outerPoints.push([0, i]);
      outerPoints.push([i, count / 4 - i]);
      outerPoints.push([count / 4 - i, i]);
    }

    function getSquares() {
      const s = Math.floor(Math.sqrt(count))
      points.length = 0;
      let i = 0;
      for (let y = 0; y < s * 2; y += 2) {
        for (let x = 0; x < s * 2; x += 2) {
          i++;
          points.push(new Square(context, [x, y], outerPoints[i]))
        }
      }
    }
    getSquares();

    return (props) =>  {
      ({height, width} = props)

      context.save()
      
      context.fillStyle = 'rgb(20, 20, 20)';
      context.fillRect(0, 0, width, height);
      context.translate(width / 2 - 40, height / 2 - 130);
      context.rotate(Math.PI / 4);
      
      for (let i = 0; i < points.length; i++) {
        points[i].render();
      }
      context.restore()
    }

  };
}

function Canvas({ gui }) {
  useCanvas({ sketch: sketch({ gui }) });
  return '';
}

export default Canvas;