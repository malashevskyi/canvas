import random from 'canvas-sketch-util/random';

import useCanvas from '../../hooks/useCanvas';

random.setSeed(random.pick(['513468']));

const sketch = () => (initialProps) => {
  const { context } = initialProps;
  let { height, width } = initialProps;

  const particles = [];
  const count = 100;
  let tick = 0;

  class Particle {
    constructor(x, y, color, speed) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.speed = speed;
      this.alpha = 1;
      this.w = 15;
      this.h = 15;
    }

    draw() {
      context.save();
      context.globalAlpha = this.alpha;
      context.beginPath();
      context.rotate(tick * 2);
      context.rect(this.x, this.y, this.w, this.h);
      context.fillStyle = this.color;
      context.fill();
      context.restore();
    }

    render() {
      this.draw();
      if (this.w > 0.2) {
        this.w -= 0.2;
        this.h -= 0.2;
      }
      this.x += this.speed.x;
      this.y += this.speed.y;
      this.alpha -= 0.008;
    }
  }

  function addParticles() {
    const angleIncrement = (Math.PI * 2) / count;

    for (let i = 0; i < count; i++) {
      const inc = i % (count / 40);

      particles.push(
        new Particle(0, 0, `hsl(${random.range(40, 60)}, 50%, 50%)`, {
          x: Math.cos(angleIncrement * i) * inc,
          y: Math.sin(angleIncrement * i) * inc,
        })
      );
    }
  }

  return (updatedProps) => {
    ({ width, height } = updatedProps);

    if (document.visibilityState === 'visible') {
      if (tick % 10 === 0) {
        addParticles();
      }
    }

    tick += 1;

    context.fillStyle = 'rgba(10, 10, 10, 1)';
    context.fillRect(0, 0, width, height);

    context.save();
    context.translate(width / 2, height / 2);
    context.rotate(-tick / 10);
    context.scale(1.5, 1.5);

    particles.forEach((particle, i) => {
      if (particle.alpha > 0) {
        particle.render();
      } else {
        particles.splice(i, 1);
      }
    });
    context.restore();
  };
};

function Canvas({ gui }) {
  useCanvas({ sketch: () => sketch({ gui }) });
  return '';
}

export default Canvas;
