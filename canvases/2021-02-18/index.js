import { useEffect } from 'react';
import useCanvas from '../../hooks/useCanvas';

import random from 'canvas-sketch-util/random';
import gsap from 'gsap';

import Particle from './Particle';
import { imageData } from './imageData';

const particles = [];
const tls = [];

const sketch = () => (initialProps) => {
  const { context } = initialProps;
  let { height, width } = initialProps;

  const image = {
    width: 96,
    height: 96,
    data: imageData,
  };

  if (particles.length === 0) {
    getParticles();
    animateParticles();
  }

  function getParticles() {
    // reset particles
    particles.length = 0;

    let i = 0;
    for (let y = 0; y < image.height; y++) {
      for (let x = 0; x < image.width; x++) {
        if (image.data[i + 3] > 1) addParticle(x, y, i);
        i += 4;
      }
    }
  }

  function addParticle(x, y, i) {
    particles.push(
      new Particle({
        context,
        x: x * 2,
        y: y * 2,
        color: `rgba(${image.data[i]}, ${image.data[i + 1]}, ${image.data[i + 2]}, ${
          image.data[i + 3]
        })`,
      })
    );
  }

  function animateParticles() {
    particles.forEach((particle, i) => {
      const delay = Math.floor(i * (Math.random() * 5)) / 20;
      tls.push(
        gsap.to(particle, {
          duration: 5,
          x: random.rangeFloor(400, 900),
          y: 500,
          ease: 'power4.in',
          delay: delay,
        })
      );
      tls.push(
        gsap.to(particle, {
          duration: 1,
          alpha: 0,
          delay: delay + 3.5,
          ease: 'linear',
        })
      );
    });
  }

  return (updatedProps) => {
    ({ width, height } = updatedProps);

    if (image.width && image.height) {
      context.translate(width / 2 - (image.width / 2) * 3, height / 2 - (image.height / 2) * 3);
      context.fillStyle = 'white';
      context.fillRect(0, 0, 700, 500);
    }

    particles.forEach((particle, i) => {
      if (particle.y >= 700) {
        particles.splice(i, 1);
      }
      particle.draw();
    });
  };
};

function Canvas({ gui }) {
  useCanvas({ sketch: () => sketch({ gui }) });

  useEffect(() => {
    tls.forEach((tl) => {
      tl.restart(true, false);
    });

    return () => {
      tls.forEach((tl) => {
        tl.pause();
      });
    };
  });

  return '';
}

export default Canvas;
