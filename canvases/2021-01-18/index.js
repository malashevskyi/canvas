
import random from 'canvas-sketch-util/random';
import palettes from 'nice-color-palettes';

import { useCanvas } from '../../hooks/useCanvas';
import Particle from './Particle';
import { useNotification } from '../../hooks/useNotification';

const sketch = ({ gui }) => {
  return ({ width, height, context, canvas }) => {
    random.setSeed(1);
    const particles = [];
    const mouse = { x: width / 2, y: height / 2};
    const count = 45;
    let canvasRectAlpha = 0.2;
  
    canvas.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
  
    function addParticles() {
      setTimeout(addParticles, 100)
  
      const power = 7;
      const angleIncrement = (Math.PI * 2) / count;
  
      const palette = random.pick(palettes).slice(0, 1);
      for (let i = 0; i < count; i++) {
        particles.push(
          new Particle(
            context,
            mouse.x,
            mouse.y,
            6,
            random.pick(palette),
            {
              x: Math.cos(angleIncrement * i) * power,
              y: Math.sin(angleIncrement * i) * power,
            }
          )
        );
      }
    }
  
    addParticles();
  
    return (props) => {
      ({ height, width } = props);
  
      context.fillStyle = `rgba(10, 10, 10, ${canvasRectAlpha})`;
      context.fillRect(0, 0, width, height);
  
      particles.forEach((particle, i) => {
        if (particle.alpha > 0) {
          particle.render();
        } else {
          particles.splice(i, 1);
        }
      });
    };
  };
}

function Canvas({ gui }) {
  useCanvas({ sketch: sketch({ gui }) });
  useNotification({
    message: 'Move mouse to change position'
  });

  return '';
}

export default Canvas;