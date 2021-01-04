import setSketch from '../utils/setSketch';

import random from 'canvas-sketch-util/random'
import { lerp } from 'canvas-sketch-util/math'
import palettes from 'nice-color-palettes'

import { debounceInterval } from '../utils/debounce'
import getGui from '../utils/getGui'



const sketch = ({ width, height }) => {
  
  const particles = [];
  let alpha = 1;
  let context;
  let speedUp = true;
  let opt = {
    palettes: [
      ["#cfffdd", "#b4dec1", "#5c5863", "#a85163", "#ff1f4c"],
      ["#382f32", "#ffeaf2", "#fcd9e5", "#fbc5d8", "#f1396d"],
      ["#e8ddcb", "#cdb380", "#036564", "#033649", "#031634"],
      ["#00a0b0", "#6a4a3c", "#cc333f", "#eb6841", "#edc951"]
    ]
  }

  random.setSeed(16)
  let palette = palettes[0];

  class Particle {
    constructor(x, y, radius, color) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
    }

    draw() {
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      context.shadowColor = this.color;
      context.shadowBlur = 10;
      context.fillStyle = this.color;
      context.fill();
      context.closePath();
    }

    render() {
      this.draw()
      const dx = this.x;
      const dy = this.y;
      const angle = Math.atan2(this.x, this.y);
      const radius = Math.sqrt(dx * dx + dy * dy);
      const angleInc = speedUp ? 0.01 : 0.001

      this.x = radius * Math.sin((angle + angleInc).toFixed(3))
      this.y = radius * Math.cos((angle + angleInc).toFixed(3))
    }
  }

  function getParticles(amount) {
    const angle = Math.PI * 2 / amount;

    for (let i = 0; i < amount; i++) {
      particles.push(
        new Particle(
          lerp(0, 400 * Math.sin(angle * i), Math.random()),
          lerp(0, 400 * Math.cos(angle * i), Math.random()),
          Math.random() + 0.5,
          random.pick(palette)
        )
      );
    }
  }


  const gui = (gui) => {
    gui.add( {palettes: '1'}, 'palettes', [
      ['1'],
      ['2'],
      ['3'],
      ['4']
    ]).name('Change palette')
    .onChange((e) => {
      palette = [
        opt.palettes[e - 1][0],
        opt.palettes[e - 1][1],
        opt.palettes[e - 1][2],
        opt.palettes[e - 1][3],
        opt.palettes[e - 1][4],
      ]
      particles.forEach(particle => {
        particle.color = random.pick(palette)
      })
    })
  };
  
  return (props) => {
    
    if (!context) {
      ({ context } = props);

      getGui(gui);

      getParticles(120);
      debounceInterval(() => {
        speedUp = !speedUp;
      }, 3000);
    }

    context.fillStyle = `rgba(10, 10, 10, ${alpha})`;
    context.fillRect(0, 0, width, height);

    if (alpha > 0.1) {
      if (speedUp) {
        alpha -= 0.09;
      } else {
        alpha += 0.001;
      }
    } else if (alpha < 1) {
      alpha += 0.1;
    }

    context.save();
    context.translate(width / 2, height / 2);
    particles.forEach((particle) => {
      particle.render();
    });
    context.restore();


    context.globalCompositeOperation = 'destination-in';
    context.arc(
      width / 2,
      height / 2,
      400, // Math.min(width, height) / 2, // fullscreen circle 
      0,
      Math.PI * 2
    );
    context.fillStyle = 'rgba(0, 0, 0, 1)';
    context.fill();
    context.restore();
  };
};

export default setSketch(
  sketch,
  { animate: true }
);
