import { useEffect } from 'react'
import gsap from 'gsap';

import { useCanvas } from '../../hooks/useCanvas';
import Particle from './Particle';
// import imageSrc from '../../public/images/canvas/lake1000-1000.jpg'
import imageSrc from '../../public/images/canvas/lake1000-1000.jpg'

const tls = [];

const sketch = ({ gui }) => {
  return ({ context, width, height, canvas }) => {
    const particles = [];

    const opt = {
      offset: 0,
      offset2: 0,

      // increase to make an image bigger
      squaresCount: 20,

      squareWidth: 20,
      squareHeight: 20,
      screenRadius: Math.sqrt(width * width + height * height) / 2,
    }
    const image = new Image();
    image.src = imageSrc;

    image.onload = () => {
      for (let uX = 0; uX < opt.squaresCount; uX++) {
        for (let uY = 0; uY < opt.squaresCount; uY++) {
          const newParticle = new Particle({ context, uX, uY, opt, image });

          particles.push(newParticle);

          tls.push(gsap.to(newParticle, {
            x: 0,
            y: 0,
            duration: 5,
            repeatDelay: 1,
            delay: 1,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut'
          }));
        }
      }

    }

    return (props) => {
      ({ width, height } = props);

      context.clearRect(0, 0, width, height);

      context.translate(
        width / 2 - (opt.squaresCount * opt.squareWidth / 2) - (opt.squaresCount * opt.offset / 2),
        height / 2 - (opt.squaresCount * opt.squareHeight / 2) - (opt.squaresCount * opt.offset / 2)
      );

      if (particles.length !== 0) {
        particles.forEach(particle => {
          particle.update()
        })
      }
    }
  }
}

function Canvas({ gui }) {
  useCanvas({ sketch: sketch({ gui }) });

  useEffect(() => {
    tls.forEach(tl => {
      tl.restart(true, false);
    })
    
    return () => {
      tls.forEach(tl => {
        tl.pause();
      })
    }
  });

  return '';
}

export default Canvas;