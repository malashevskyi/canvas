import setSketch from '../../utils/setSketch';
import Ball from './Ball';
import getGui from '../../utils/getGui';

const sketch = ({ context, width, height, time }) => {
  let color;
  let tick = 0;
  const balls = [];
  const opt = {
    frequency: 20
  }

  const angles = [];
  
  function getAngles() {
    angles.length = 0;
    for (let i = 0; i < 3; i++) {
      angles.push(((Math.PI / 2) / 100) * i + time);
    }
  }
  
  function getParticles() {
    for (let i = 0; i < 3; i++) {
      balls.push(new Ball(context, angles[i], color));
    }
  }

  
  getGui((gui) => {
    gui.add(opt, 'frequency').min(0).max(100).step(5).name('Frequency');
  })
  
  context.clearRect(0, 0, width, height);

  return (props) => {
    ({ width, height, time } = props);
    
    context.fillStyle = 'rgba(0, 0, 0, 0.1)';
    context.fillRect(0, 0, width, height);
    
    tick += 5;
    color = `hsl(${tick}, 50%, 50%)`
    
    if (tick % -(opt.frequency - 105) === 0) {
      getAngles();
      getParticles();
    }
    
    context.save(); 
    context.translate(width / 2, height / 2);
    for (let i = 0; i < balls.length; i++) {
      if (balls[i].radius === 0) {
        balls.splice(i, 1)
      }
      balls[i].render();
    }
    context.restore();
  }
};

export default setSketch(
  sketch,
  { animate: true }
);