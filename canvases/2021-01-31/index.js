import { useCanvas } from '../../hooks/useCanvas';
import Ball from './Ball';

const sketch = ({ gui }) => {
  return ({ context, width, height, time }) => {
    let color;
    let tick = 0;
    const balls = [];
    const opt = {
      curve: true
    }

    const angles = [];
    
    function getAngles() {
      angles.length = 0;
      for (let i = 0; i < 5; i++) {
        angles.push(((Math.PI / 2) / 100) * i + time);
      }
    }
    
    function getParticles() {
      for (let i = 0; i < 5; i++) {
        balls.push(new Ball(context, angles[i], opt, color));
      }
    }

    gui?.show()
    gui?.add(opt, 'curve').name('Curve')

    context.clearRect(0, 0, width, height);

    return {
      render(props) {
        ({height, width, time} = props)
        
        context.fillStyle = 'rgba(0, 0, 0, 0.1)';
        context.fillRect(0, 0, width, height);
    
        tick += 5;
        color = `hsl(${tick}, 50%, 50%)`
    
        getAngles();
        getParticles();
    
    
        context.save(); 
        context.translate(width / 2, height / 2);
        balls.forEach((ball, i) => {
          if (ball.tick > 90) {
            balls.splice(i, 1)
          }
          ball.render();
        })
        context.restore();
      }
    }
  }
}

function Canvas({ gui }) {
  useCanvas({ sketch: sketch({ gui }) });
  return '';
}

export default Canvas;