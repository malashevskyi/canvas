import useCanvas from '../../hooks/useCanvas';

const sketch = () => (initialProps) => {
  const { context } = initialProps;
  let { height, width } = initialProps;

  const particles = [];
  let xL = Math.min(width, 1000);
  let yL = Math.min(height, 600);

  const mouse = {
    x: xL / 2,
    y: yL / 2,
    radius: Math.max(width, height),
  };

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.radius = 1;
      this.baseX = this.x;
      this.baseY = this.y;
      this.density = Math.random() * 40 + 5;
      this.colorTick = 0;
      this.colorTickC = 1;
    }

    draw() {
      context.fillStyle = this.color;
      context.beginPath();
      context.rect(this.x, this.y, 2, 2);
      context.closePath();
      context.fill();
    }

    update() {
      this.colorTick += this.colorTickC;
      if (this.colorTickC > 100 || this.colorTickC === 0) {
        this.colorTickC = -this.colorTickC;
      }
      this.color = `hsl(${this.colorTick * 2 + 250}, 50%, 50%)`;

      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < mouse.radius) {
        this.x += (dx / distance) * 1.5;
        this.y += (dy / distance) * 1.5;
      } else {
        if (this.x !== this.baseX) {
          this.x -= (this.x - this.baseX) / 12;
        }
        if (this.y !== this.baseY) {
          this.y -= (this.y - this.baseY) / 12;
        }
      }
      this.draw();
    }
  }

  function init() {
    particles.length = 0;

    for (let x = 0; x < xL; x += 14) {
      for (let y = 0; y < yL; y += 14) {
        particles.push(new Particle(x, y));
      }
    }
  }
  init();

  let tick = 0;

  return (updatedProps) => {
    ({ width, height } = updatedProps);

    xL = Math.min(width, 1000);
    yL = Math.min(height, 600);

    tick += 1;

    if (tick > 50) {
      mouse.x = -10000;
      mouse.y = -10000;
      if (tick > 100) {
        tick = 0;
        mouse.x = xL / 2;
        mouse.y = yL / 2;
      }
    }

    context.fillRect(0, 0, width, height);
    context.translate(width / 2 - xL / 2, height / 2 - yL / 2);

    particles.forEach((particle) => {
      particle.update();
    });
  };
};

function Canvas({ gui }) {
  useCanvas({ sketch: () => sketch({ gui }) });
  return '';
}

export default Canvas;
