

import Square from './Square';
import { useCanvas } from '../../hooks/useCanvas';

const sketch = ({ gui }) => {
  return ({ context, width, height }) => {
    const points = [];
    let maxSide = Math.max(width, height);
  
    function getSquares() {
      points.length = 0;
      for (let y = 0; y < 80; y += 2) {
        for (let x = 0; x < 80; x += 2) {
          points.push(new Square(context, maxSide, [x, y]))
        }
      }
    }
    getSquares();
  
    return {
      render(props) {
        ({height, width} = props)
        
        context.fillStyle = 'rgb(20, 20, 20)';
        context.fillRect(0, 0, width, height);
        context.translate(width / 2 - 40, height / 2 - 40);
  
        for (let i = 0; i < points.length; i++) {
          points[i].render();
        }
      },
      resize() {
        getSquares();
      }
    }
  
  };
}

function Canvas({ gui }) {
  useCanvas({ sketch: sketch({ gui }) });
  return '';
}

export default Canvas;