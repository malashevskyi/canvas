
import random from 'canvas-sketch-util/random';
import palettes from 'nice-color-palettes';
import { store } from 'react-notifications-component';

import Particle from './Particle';
import { useNotification } from '../../hooks/useNotification';
import { useCanvas } from '../../hooks/useCanvas';

const sketch = ({ gui }) => {
  return ({ context, width, height }) => {
    const particles = [];
    const mouse = { x: null, y: null };
    const count = 400;
    let canvasRectAlpha = 1;
    let intervalAlpha;
  
    function addParticles(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
  
      clearInterval(intervalAlpha);
      let startClearRect = 0;
      canvasRectAlpha = 0.2;
      intervalAlpha = setInterval(() => {
        startClearRect++;
        if (startClearRect > 200) {
          canvasRectAlpha += 0.009;
        }
        if (canvasRectAlpha >= 1) {
          clearInterval(intervalAlpha);
        }
      });
  
      const power = 20;
      const angleIncrement = (Math.PI * 2) / count;
  
      const palette = random.pick(palettes).slice(0, 3);
      for (let i = 0; i < count; i++) {
        particles.push(
          new Particle(
            context,
            mouse.x,
            mouse.y,
            3,
            random.pick(palette),
            {
              x: Math.cos(angleIncrement * i) * Math.random() * power,
              y: Math.sin(angleIncrement * i) * Math.random() * power,
            }
          )
        );
      }
    }
  
    context.canvas.addEventListener('click', addParticles);
  
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
    message: 'Click to see an animation'
  });
  
  return '';
}

export default Canvas;