import React, { useEffect } from 'react';

import { useCanvas } from './../../hooks/useCanvas';
import gsap from 'gsap';

let tl;

const sketch = ({ context, width, height}) => {
  const particles = [];

  const mouse = {
    x: -width,
    y: -width,
    radius: width,
  }

  function setTween() {
    tl?.kill();
    tl = gsap.to(mouse, {
      duration: 5,
      x: width + width,
      y: height + width,
      repeatDelay: 0,
      ease: 'power1.out',
      repeat: -1,
    })
  }
  setTween();

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.radius = 1;
      this.baseX = this.x;
      this.baseY = this.y;
      this.density = (Math.random() * 40) + 5;
      this.colorTick = 0;
      this.colorTickC = 1;
      this.color = 'hsl(360, 50%, 50%)';
    }

    draw() {
      context.fillStyle = this.color;
      context.beginPath();
      context.rect(this.x, this.y, 19, 19)
      context.closePath();
      context.fill();
    }

    update() {
      this.colorTick += this.colorTickC;
      if (this.colorTickC > 100 || this.colorTickC === 0) {
        this.colorTickC = - this.colorTickC
      }


      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < mouse.radius) {
        this.x += dx / distance * 1.5;
        this.y += dy / distance * 1.5;
      } else {
        if (this.x !== this.baseX) {
          let dx = this.x - this.baseX;
          this.x -= dx / 12;
        }
        if (this.y !== this.baseY) {
          let dy = this.y - this.baseY;
          this.y -= dy / 12;
        }
      }
      this.draw()
    }
  }

  function init() {
    particles.length = 0;

    for(let x = 0; x < Math.ceil(width / 20); x++) {
      for(let y = 0; y < Math.ceil(height / 20); y++) {
        particles.push(new Particle(x * 20, y * 20));
      }
    }
  }
  init();

  return {
    render(props) {
      ({ width, height } = props);
    
      context.fillStyle = 'black';
      context.fillRect(0, 0, width, height);
    
      particles.forEach(particle => {
        particle.update();
      })
    },
    resize(props) {
      ({ width, height } = props);
      mouse.x = -width;
      mouse.y = -width;
      init();
      setTween();
    }
  }
};

const Canvas = React.forwardRef((props, ref) => {
  const canvas = ref.current;
  useCanvas({ canvas, sketch });

  useEffect(() => {
    return () => {
      tl?.kill();
    }
  })

  return '';
});

export default Canvas;