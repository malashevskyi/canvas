

import { useCanvas } from '../../hooks/useCanvas';
import Circle from './Circle';

const sketch = ({ gui }) => {
  return ({ context, width, height, time }) => {
    let startAngle = 0;

    const opt = {
      count: 15,
      offset: 4,
      radius: 140,
      waveOffset: 30,
    }
    const circles = [];

    function getCircles() {
      for (let i = opt.count; i > 0; i--) {
        circles.push(new Circle({
          context,
          radius: opt.radius + opt.offset * i,
          offsetAngle: i * opt.waveOffset * Math.PI / 180,
          index: i
        }))
      }
    }
    getCircles();

    return {
      render(props) {
        ({height, width, time} = props)
        
        startAngle++;

        context.clearRect(0, 0, width, height);
    
        circles.forEach((circle, i) => {
          // circle.color = `hsl(${(i * 5 + time * 10) % 250 + 110}, 50%, 50%)`
          circle.draw(startAngle, width, height);
        })
      }
    }
  }
}

function Canvas({ gui }) {
  useCanvas({ sketch: sketch({ gui }) });
  return '';
}

export default Canvas;