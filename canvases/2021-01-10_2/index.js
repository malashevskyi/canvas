import random from 'canvas-sketch-util/random';
import palettes from 'nice-color-palettes';

import { useCanvas } from '../../hooks/useCanvas';

const sketch = ({ gui }) => {
  return ({ context, width, height }) => {
    random.setSeed(24);
  
    const palette = random.pick(palettes);
    const TWO_PI = Math.PI * 2;
    const opt = {
      rotateAngle: 2,
    };
    const countCircles = 5;
    const balls = [];
    const c = []; // cords, big circle
    const c2 = []; // cords, small circles
  
    let tick = 0;
  
    class Ball {
      constructor(x, y) {
        this.anchorX = x;
        this.anchorY = y;
        this.x = x;
        this.y = y;
        this.color = random.pick(palette);
        this.dx = 1;
        this.dxI = 1;
        this.tick = 0;
        this.radius = 20;
      }
  
      draw() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
      }
      render() {
        this.dx += this.dxI;
        if (this.dx % 50 === 0) {
          this.dxI = -this.dxI;
        }
  
        this.x = this.dx;
        this.y = this.dx;
        this.draw();
      }
    }
  
    for (let i = 0; i <= 25; i++) {
      balls.push(new Ball(0, 0));
    }
  
    function createCords(count, radius, array) {
      const angle = (Math.PI * 2) / count;
      for (let i = 0; i < count; i++) {
        array.push({
          x: radius * Math.cos(angle * i),
          y: radius * Math.sin(angle * i),
        });
      }
    }
  
    createCords(1000, 400, c);
    createCords(700, 70, c2);
  
    function clearCanvas() {
      context.fillStyle = 'rgba(255, 255, 255, 1)';
      context.fillRect(0, 0, width, height);
      context.clearRect(0, 0, width, height);
    }
    clearCanvas();
    
    gui?.show()
    gui?.add(opt, 'rotateAngle').min(2).max(20).name('Rotate Angle');
  
    return (props) => {
      ({ width, height } = props);
  
      tick++;
  
      context.translate(width / 2, height / 2);
  
      let d = [4.5, 1.7, 1.1]
      for (let j = 0; j < 3; j++) {
        context.save();
          context.translate(
            // center of the small circle (moving)
            c[tick % c.length].x / d[j],
            c[tick % c.length].y / d[j]
          );
          for (let i = j * 5; i <= 5 + j * 5; i++) {
            context.save();
            context.rotate(
              (TWO_PI / opt.rotateAngle) * (tick % opt.rotateAngle) +
                (TWO_PI / countCircles) * i
            );
            balls[i + j * 5].render();
            context.restore();
          }
        context.restore();
      }
    };
  };

}

function Canvas({ gui }) {
  useCanvas({ sketch: sketch({ gui }) });
  return '';
}

export default Canvas;