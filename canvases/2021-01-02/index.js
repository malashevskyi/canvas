import random from 'canvas-sketch-util/random';
import palettes from 'nice-color-palettes';

import useCanvas from '../../hooks/useCanvas';
import { useNotification } from '../../hooks/useNotification';
import Particle from './Particle';

const particles = [];

const sketch = () => (initialProps) => {
  const { context, canvas } = initialProps;
  let { height, width } = initialProps;

  const mouse = { x: null, y: null };
  const count = 150;
  let canvasRectAlpha = 1;
  let intervalAlpha;

  function addParticles(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    clearInterval(intervalAlpha);
    let startClearRect = 0;
    canvasRectAlpha = 0.1;

    intervalAlpha = setInterval(() => {
      startClearRect++;
      if (startClearRect > 200) {
        canvasRectAlpha += 0.004;
      }
      if (canvasRectAlpha >= 1) {
        clearInterval(intervalAlpha);
      }
    });

    const power = 30;
    const angleIncrement = (Math.PI * 2) / count;

    const palette = random.pick(palettes).slice(0, 3);
    for (let i = 0; i < count; i++) {
      addParticle(i);
    }

    function addParticle(i) {
      particles.push(
        new Particle({
          context,
          x: mouse.x,
          y: mouse.y,
          radius: 1,
          color: random.pick(palette),
          velocity: {
            x: Math.cos(angleIncrement * i) * Math.random() * power,
            y: Math.sin(angleIncrement * i) * Math.random() * power,
          },
        })
      );
    }
  }

  canvas.onclick = addParticles;

  return (updatedProps) => {
    ({ height, width } = updatedProps);

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

function Canvas({ gui }) {
  useCanvas({ sketch: () => sketch({ gui }) });
  useNotification({
    message: 'Click to see an animation',
  });

  return '';
}

export default Canvas;
