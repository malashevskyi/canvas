import gsap from 'gsap';
import random from 'canvas-sketch-util/random';

import { useCanvas } from '../../hooks/useCanvas';
import Particle from './Particle';

const sketch = ({ gui }) => {
  return ({ context, width, height, time }) => {
    random.setSeed(4);

    const particles = [];

    const mouse = {
      x: 0,
      y: 0,
      radius: 50,
    }

    gsap.to(mouse, {
      duration: 2,
      radius: 390,
      repeat: -1,
      repeatDelay: 0,
      yoyo: true,
      ease: 'power1.inOut'
    })

    function getParticles() {
      particles.length = 0;
      for (let i = 0; i < 1000; i++) {
        const [x, y] = random.insideCircle(400);
        particles.push(new Particle({ context, x, y }));
      }
    }
    getParticles();

    return (props) => {
      ({ width, height } = props);

      context.clearRect(0, 0, width, height);
      context.translate(width / 2, height / 2);

      particles.forEach(particle => {
        particle.update(mouse);
      })
    };
  }
}

function Canvas({ gui }) {
  useCanvas({ sketch: sketch({ gui }) });
  return '';
}

export default Canvas;