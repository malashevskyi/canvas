import { useEffect } from 'react';

import Gun from './Gun'
import Circle from './Circle'
import useCanvas from '../../hooks/useCanvas';

const sketch = () => (initialProps) => {
  const { context, canvas } = initialProps;
  let { width, height } = initialProps;

  const guns = [];
  const circles = [];
  const cartridges = [];
  const mouse = {
    x: width / 2,
    y: height / 2,
  };
  let tick = 0;

  canvas.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function getGuns() {
    guns.length = 0;

    guns.push(
      new Gun({
        context,
        x: width / 2 - 300,
        y: height - 130,
        radius: 80,
      })
    );
    guns.push(
      new Gun({
        context,
        x: width / 2 + 300,
        y: height - 130,
        radius: 80,
      })
    );
  }
  getGuns();

  function getCircle() {
    circles.push(new Circle({
      context,
      cartridges,
      x: Math.random() * (width - 400) + 200,
      y: -40
    }))
  }
  getCircle();

  return {
    render(initialProps) {
      ({ width, height } = initialProps);
      
      tick++;
      
      context.fillStyle = 'black';
      context.fillRect(0, 0, width, height);

      // add one circle every 160ms
      if (tick % 10 === 0) {
        getCircle();
      }
    
      guns.forEach(gun => {
        gun.draw(mouse, tick);

        if (tick % 10 === 0) {
          cartridges.push(gun.getCartridge());
        } 
      })

      circles.forEach((particle, i) => {
        if (particle.y - 50 > height || particle.radius === 0) circles.splice(i, 1);
        particle.update();
        particle.draw();
      })
      cartridges.forEach((cartridge, i) => {
        if (cartridge.y < -10 || cartridge.used) cartridges.splice(i, 1);
        cartridge.update();
        cartridge.draw();
      })
    },
    resize() {
      getGuns();
    }
  };
};

function Canvas({ gui }) {
  useCanvas({ sketch: () => sketch({ gui }) });

  return '';
}

export default Canvas;
