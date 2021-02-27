import random from 'canvas-sketch-util/random'
import { linspace } from 'canvas-sketch-util/math'
import palettes from 'nice-color-palettes'

import { useCanvas } from '../../hooks/useCanvas';

random.setSeed('749302')
const palette = random.pick(palettes);

const sketch = ({ gui }) => {
  return ({ context, width, height }) => {
  
    function throttleTimeout(count, delay) {
      let isThrottled = false;
      let tick = 0;
      return () => {
        if (isThrottled) return true;
        tick++
  
        if (tick > count * delay) {
          isThrottled = true;
  
          setTimeout(() => {
            isThrottled = false;
            tick = 0
          }, count * delay * 16)
        }
        return isThrottled
      }
    }
  
    const rects = [];
    let countX;
    let countY;
    
    class Particle {
      constructor({ x, y }) {
        this.x = x;
        this.y = y;
        this.color = random.pick(palette);
        this.delay = Math.random() * 100;
        this.alphaMarker = false;
        this.alpha = 1;
        this.throttleTimeout = throttleTimeout(10, this.delay);
      }
      
      draw() {
        let throttle = this.throttleTimeout()
  
        if (throttle && this.alpha <= 1) {
          this.alpha += 0.03
        } else if (this.alpha > 0.5) {
          this.alpha -= 0.03
        }
  
        context.save()
        context.beginPath();
        context.rect(this.x, this.y, width / countX, height / countY)
        context.globalAlpha = this.alpha;
        context.fillStyle = this.color
        context.fill()
        context.restore()
      }
      animate() {
        this.draw();
      }
    }
  
    const createGrid = () => {
      countX = Math.floor(width / 40);
      countY = Math.floor(height / 40);
  
      const u = linspace(countX);
      const v = linspace(countY);
  
      for (let x = 0; x < countX; x++) {
        for (let y = 0; y < countY; y++) {
          // const u = countX <= 1 ? 0.5 : x / (countX);
          // const v = countY <= 1 ? 0.5 : y / (countY);
          rects.push(
            new Particle({ x: width * u[x], y: height * v[y]})
          )
        }
      }
    };
    
    createGrid();
  
    return {
      render(props) {
        ({ width, height } = props);
        
        context.fillRect(0, 0, width, height);
        
        rects.forEach((particle) => {
          particle.animate();
        });
      },
      
      resize(props) {
        ({ width, height } = props);
        rects.length = 0;
        createGrid();
      }
    }
  };
}

function Canvas({ gui }) {
  useCanvas({ sketch: sketch({ gui }) });
  return '';
}

export default Canvas;