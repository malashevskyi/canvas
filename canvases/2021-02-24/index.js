import { useEffect } from 'react';
import gsap from 'gsap';

import { useCanvas } from '../../hooks/useCanvas';
import { useNotification } from '../../hooks/useNotification';
import { store } from 'react-notifications-component';
import Particle from './Particle';

const tls = [];

const sketch = ({ gui }) => {
  return ({ context, width, height, canvas }) => {
    // debounceNotification('Move mouse to interact with particles')
    // store.addNotification({
    //   showIcon: true,
    //   title: 'Info',
    //   message: 'Move mouse to interact with particles',
    //   type: 'info',
    //   id: 'id',
    //   insert: "top",
    //   container: "top-center",
    //   animationIn: ["animate__animated animated flipInY"],
    // });
    // store.addNotification({
    //   title: "Wonderful!",
    //   message: "teodosii@react-notifications-component",
    //   type: "success",
    //   insert: "top",
    //   container: "top-right",
    //   // animationIn: ["animate__animated", "animate__fadeIn"],
    //   animationIn: ["animate__animated animated flipInY"],
    //   animationOut: ["animate__animated", "animate__fadeOut"],
    //   dismiss: {
    //     duration: 5000,
    //     onScreen: true
    //   }
    // });

    const particles = [];
    const coordsCount = 200;
    const angle = (Math.PI * 2) / coordsCount;
    const circlesRadius = 100;

    const mouse = {
      x: width / 2,
      y: height / 2,
    };

    canvas.addEventListener('mousemove', (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    });

    function getParticles() {
      for (let i = 0; i < 40; i++) {
        const newParticle = new Particle({
          context,
          // random start tick from 0 to coordsCount for random start position on circle
          startTick: Math.floor(
            Math.random() * coordsCount
          ),
          coordsCount,
          angle,
          circlesRadius,
          mouseStart: mouse,
          index: i,
        });

        particles.push(newParticle);

        tls.push(
          gsap.to(newParticle, {
            duration: 4,
            radius: 7,
            repeat: -1,
            yoyo: true,
            delay: Math.random() * 3,
            ease: 'power2.inOut',
          })
        );
      }
    }
    getParticles();

    return (props) => {
      ({ width, height } = props);

      context.fillStyle = 'rgba(10, 10, 10, 1)';
      context.fillRect(0, 0, width, height);

      particles.forEach((particle) => {
        particle.update(mouse);
      });
    };
  };
};

function Canvas({ gui }) {
  useCanvas({ sketch: sketch({ gui }) });
  useNotification({
    message: 'Move mouse to interact with particles'
  });

  useEffect(() => {
    tls.forEach((tl) => {
      tl.restart(true, false);
    });

    return () => {
      tls.forEach((tl) => {
        tl.pause();
      });
    };
  }, []);

  return '';
}

export default Canvas;
