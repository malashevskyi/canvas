import { useEffect } from 'react';
import gsap from 'gsap';

import useCanvas from '../../hooks/useCanvas';

const tls = [];

const sketch = ({ gui }) => (initialProps) => {
  const { context } = initialProps;
  let { height, width } = initialProps;

  const count = 20;
  const ys = Array(count).fill(0);
  const rot = Array(count).fill(0);
  const alpha = Array(count).fill(0);
  let tick = 0;

  for (let i = 0; i < count; i++) {
    // move from bottom and top to center
    tls.push(
      gsap.from(ys, {
        duration: 2,
        delay: i / 2,
        [i]: i % 2 === 0 ? -height / 2 : height / 2,
        ease: 'power3.out',
      })
    );

    // rotate
    tls.push(
      gsap.to(rot, {
        duration: 2,
        delay: i / 2 + 12,
        [i]: Math.PI,
        repeat: -1,
        repeatDelay: 9,
        yoyo: true,
        ease: 'elastic.out',
      })
    );

    // animate opacity
    tls.push(
      gsap.to(alpha, {
        duration: 2,
        delay: i / 2 + 0.5,
        [i]: 1,
        ease: 'power3.out',
      })
    );
  }

  function drawRect(i) {
    context.save();
    context.beginPath();
    context.globalAlpha = alpha[i];
    context.fillStyle = `hsl(${tick / 5 + i * 10}, 50%, 50%)`;
    context.translate(i * 43, ys[i]);
    context.rotate(rot[rot.length - 1 - i]);
    context.moveTo(0, 0);
    context.lineTo(40, 0);
    context.lineTo(40, -250);
    context.lineTo(0, -250);
    context.fill();
    context.closePath();
    context.restore();
  }

  return (updatedProps) => {
    ({ width, height } = updatedProps);

    tick += 1;

    context.clearRect(0, 0, width, height);
    context.translate(width / 2 - (43 * 20) / 2, height / 2 + 125);

    context.beginPath();

    for (let i = 0; i < count; i++) {
      drawRect(i);
    }

    context.closePath();
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
