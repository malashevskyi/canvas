import setSketch from '../utils/setSketch';

import random from 'canvas-sketch-util/random'
import { lerp } from 'canvas-sketch-util/math'
import palettes from 'nice-color-palettes'
import * as dat from 'dat.gui';

import { debounceNotification } from '../utils/debounce'  
import { debounceInterval } from '../utils/debounce'

const sketch = () => {
  debounceNotification()

  const particles = [];
  const mouse = { x: null, y: null };
  const count = 150;
  const gravity = 0.05;
  let canvasRectAlpha = 1;
  let intervalAlpha;
  let context, canvas, width, height;

  class Particle {
    constructor(x, y, radius, color, velocity) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
      this.velocity = velocity;
      this.alpha = 1;
    }

    draw() {
      context.save();
      context.globalAlpha = this.alpha;
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      context.fillStyle = this.color;
      context.fill();
      context.restore();
    }

    render() {
      this.draw();
      this.velocity.x *= lerp(0.85, 1.02, Math.random());
      this.velocity.y *= lerp(0.85, 1.02, Math.random());
      this.velocity.y += gravity;
      this.x += this.velocity.x;
      this.y += this.velocity.y;
      this.alpha -= 0.008;
    }
  }

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
      particles.push(
        new Particle(mouse.x, mouse.y, 3, random.pick(palette), {
          x: Math.cos(angleIncrement * i) * Math.random() * power,
          y: Math.sin(angleIncrement * i) * Math.random() * power,
        })
      );
    }
  }

  function loadGui() {
    window.gui?.destroy()
    window.gui = new dat.GUI();
    window.gui.width = 320
    let opt = {
      clear: () => {
        clearInterval(window.interval)
      },
      thickness: 43
    }
    window.gui.add(opt, 'clear').name('Click to clear interval')
  }
  
  return (props) => {
    ({ width, height } = props);
    
    if (!context) {
      ({ context, context: { canvas } } = props);

      loadGui();

      context.clearRect(0, 0, canvas.width, canvas.height);

      function getRandomClientXY() {
        let clientX = lerp(200, width - 200, Math.random());
        let clientY = lerp(200, height - 200, Math.random());
        return { clientX, clientY };
      }

      debounceInterval(() => addParticles(getRandomClientXY()), 700)
      
      document.addEventListener("visibilitychange", function() {
        if (document.visibilityState === 'visible') {
          debounceInterval(() => addParticles(getRandomClientXY()), 700)
        }
      });

      canvas.addEventListener('click', addParticles);
    }

    
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

export default setSketch(
  sketch,
  { animate: true }
);
