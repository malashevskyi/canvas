import { lerp } from 'canvas-sketch-util/math'
import random from 'canvas-sketch-util/random'

import setSketch from '../utils/setSketch';

function getAlphaMarker(count, delay) {
  let isThrottled = false;
  let tick = 0;
  return () => {
    if (isThrottled) return true;
    tick++

    if (tick < count * delay) {
      isThrottled = false;
    } else {
      isThrottled = true;
      setTimeout(() => {
        isThrottled = false;
        tick = 0
      }, count * delay * 16)
    }
    return isThrottled
  }
}

const sketch = ({ width, height }) => {
  const particles = [];
  const opt = {
    fallDelay: 20000
  }
  let reduceAlpha = false;
  let alpha = 1;
  let context;
  
  class Particle {
    constructor(x, y, radius, delay) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = 'yellow';
      this.alpha = 1;
      this.alphaMarker = getAlphaMarker(10, delay);
      this.tick = 0;
      this.dy = 1;
      this.random = Math.random();
      this.dx = this.random - 0.5;
      this.fallDelay = opt.fallDelay * this.random;
      this.fall = false;
      this.range = random.range(5, 13);
      this.innerParticles = [];
    }
    
    draw() {
      let alphaMarker = this.alphaMarker()
      this.tick++

      this.fallDelay = opt.fallDelay * this.random;

      if (this.fall) {
        console.log(this.random);
        this.dy = this.dy + 0.01
        this.y = this.y + this.dy
        this.x = this.x + this.dx / 2

        this.innerParticles.push(getParticleFall(this.x, this.y, this.radius));

        if (this.innerParticles.length > this.range) {
          this.innerParticles.shift();
        }
      }
  
      if (alphaMarker && this.alpha <= 0.6) {
        this.alpha += 0.03
      } else if (this.alpha > 0.1) {
        this.alpha -= 0.03
      }

      context.save()
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      context.shadowColor = this.color;
      context.shadowBlur = 10;
      context.fillStyle = this.color;
      context.fill();
      context.restore()

      context.save()
      context.beginPath();
      context.arc(this.x, this.y, this.radius + 12, 0, Math.PI * 2);
      context.fillStyle = `rgba(10, 10, 10, ${this.alpha})`
      context.fill()
      context.restore()
    }
    animate() {
      this.draw();
    }
  }
  class ParticleFall {
    constructor(x, y, radius, color) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
    }
    
    draw() {
      this.radius = this.radius * 0.9

      context.save()
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      context.shadowColor = this.color
      context.shadowBlur = 2
      context.fillStyle = this.color;
      context.fill()
      context.restore()
    }
    animate(alpha) {
      this.color = `rgba(255, 255, 0, ${alpha})`
      this.draw();
    }
  }

  function getParticleFall(x, y, r) {
    return new ParticleFall( x, y, r * 2, 'yellow' );
  }
  function getParticle() {
    return new Particle(
      lerp(-width / 2, width / 2, Math.random()),
      lerp(-height / 2, height / 2, Math.random()),
      Math.random() + 0.5,
      Math.random() * 100,
    )
  }

  function getParticles(amount) {
    for (let i = 0; i < amount; i++) {
      particles.push(getParticle());
    }
  }

  return (props) => {
    ({ width, height } = props);
    
    if (!context) {
      ({ context } = props);
      getParticles(150);
    }

    setTimeout(() => {
      reduceAlpha = !reduceAlpha;
    }, 1000)

    context.fillStyle = `rgba(10, 10, 10, ${alpha})`;
    context.fillRect(0, 0, width, height);

    if (alpha > 0.1 && reduceAlpha) {
      alpha -= 0.2;
    } else if (alpha < 1) {
      alpha += 0.2;
    }

    context.save();
    context.translate(width / 2, height / 2);

    particles.forEach((particle, i) => {
      if (particle.tick > particle.fallDelay) {
        particle.fall = true;
        if (particle.y > height / 2 + 20) {
          particles.splice(i, 1, getParticle())
        }
      }
      particle.animate();

      particle.innerParticles.forEach((pInner, i) => {
        let alpha = 1 / particle.innerParticles.length
        pInner.animate(alpha);
      });
    });

    context.restore();
  };
};

export default setSketch(
  sketch,
  { animate: true }
);
