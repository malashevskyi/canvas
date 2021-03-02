import useCanvas from '../../hooks/useCanvas';
import Particle from './Particle';

const sketch = ({ gui }) => (initialProps) => {
  const { context, canvas } = initialProps;
  let { height, width } = initialProps;

  const particles = [];
  const mouse = {
    x: width / 2,
    y: height / 2,
    radius: 200, // radius for pulling particles
  };
  const opt = {
    count: 150,
  };
  let touchColor = 'rgba(255, 0, 255, 1)';

  canvas.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
  });

  function getParticles() {
    // reset particles
    particles.length = 0;

    const margin = 150; // screen margin

    for (let i = 0; i < opt.count; i++) {
      particles.push(
        new Particle({
          context,
          x: (width - margin * 2) * Math.random() + margin,
          y: (height - margin * 2) * Math.random() + margin,
        })
      );
    }
  }
  getParticles();

  function connectParticles(touchColor) {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i; j < particles.length; j++) {
        // reset all lines color
        context.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        function setStrokeStyle(distance, radius) {
          if (distance < radius) {
            context.strokeStyle = touchColor;
          }
        }
        // reset all particles color
        particles[i].color = 'white';
        particles[j].color = 'white';
        function setDotColor(distance, radius) {
          if (distance < radius) {
            particles[i].color = touchColor;
            particles[j].color = touchColor;
          }
        }

        let dx, dy, distance;

        dx = particles[i].x - particles[j].x;
        dy = particles[i].y - particles[j].y;
        distance = Math.sqrt(dx * dx + dy * dy);

        context.beginPath();
        // draw lines
        if (distance < 95) {
          context.lineWidth = 2;
          context.moveTo(particles[i].x, particles[i].y);
          context.lineTo(particles[j].x, particles[j].y);
        }
        // if a line less than 55 make it pink
        // setStrokeStyle(distance, 55);

        // in circle radius
        // if a distance between one of two particles of the line and mouse position
        // less than 200 make this line pink
        dx = mouse.x - particles[i].x;
        dy = mouse.y - particles[i].y;
        distance = Math.sqrt(dx * dx + dy * dy);
        setDotColor(distance, 200);
        setStrokeStyle(distance, 200);

        dx = mouse.x - particles[j].x;
        dy = mouse.y - particles[j].y;
        distance = Math.sqrt(dx * dx + dy * dy);
        setStrokeStyle(distance, 200);

        context.stroke();
      }
    }
  }

  gui?.show();
  gui?.add(opt, 'count').min(100).max(600).step(30).name('Count').onChange(getParticles);

  let tick = 0;

  return {
    render(updatedProps) {
      ({ width, height } = updatedProps);

      tick++;
      if (tick % 20 === 0) {
        mouse.x = Math.random() * width;
        mouse.y = Math.random() * height;
        // mouse.x = Math.abs((Math.random() - 0.5) * 300 + mouse.x % width)
        // mouse.y = Math.abs((Math.random() - 0.5) * 300 + mouse.y % height)
      }

      context.fillRect(0, 0, width, height);

      context.save();
      connectParticles(touchColor);
      particles.forEach((particle) => {
        particle.update(mouse, width, height);
      });
      context.restore();
    },
    resize() {
      getParticles();
    },
  };
};

function Canvas({ gui }) {
  useCanvas({ sketch: () => sketch({ gui }) });
  return '';
}

export default Canvas;
