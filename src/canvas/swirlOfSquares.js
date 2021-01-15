import setSketch from '../utils/setSketch';
import { debounceInterval } from '../utils/debounce'

const sketch = ({ context, width, height }) => {
  const particles = [];
  const mouse = { x: 0, y: 0 };
  const count = 200;
  let tick = 0;

  class Particle {
    constructor(x, y, color, speed) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.speed = speed;
      this.alpha = 1;
    }
    draw() {
      context.globalAlpha = this.alpha;
      context.beginPath();
      context.rect(this.x, this.y, 7, 7);
      context.fillStyle = this.color;
      context.fill();
    }
    animate() {
      this.draw();
      this.x += this.speed.x;
      this.y += this.speed.y;
      this.alpha -= 0.008;
    }
  }

  function addParticles() {
    const angleIncrement = (Math.PI * 2) / count;

    for (let i = 0; i < count; i++) {
      let inc = i % (count / 42);

      particles.push(
        new Particle(
          mouse.x,
          mouse.y,
          `hsl(${tick * 10}, 50%, 50%)`,
          {
            x: Math.cos(angleIncrement * i) * inc,
            y: Math.sin(angleIncrement * i) * inc,
          }
        )
      );
    }
  }
  
  debounceInterval(() => addParticles(), 400)

  document.addEventListener("visibilitychange", function() {
    if (document.visibilityState === 'visible') {
      debounceInterval(() => addParticles(), 400)
    }
  });

  return (props) => {
    ({ width, height } = props);
    tick += 0.04;

    context.fillStyle = `rgba(10, 10, 10, 1)`;
    context.fillRect(0, 0, width, height);

    context.save()
    context.translate(width / 2, height / 2);
    context.rotate(-tick)
    
    particles.forEach((particle, i) => {
      if (particle.alpha > 0) {
        particle.animate();
      } else {
        particles.splice(i, 1);
      }
    });
    context.restore()
  };
};

export default setSketch(
  sketch,
  { animate: true }
);