import setSketch from '../../utils/setSketch';
import Particle from './Particle';
import imageSrc from '../../images/canvas/support.png'

const sketch = ({ context, width, height, canvas, time }) => {
  context.clearRect(0, 0, width, height); // clear previous canvas

  const particles = [];
  const mouse = {
    x: width / 2,
    y: height / 2,
    radius: 300,
  }
  let tick = 0;

  const image = new function() {
    this.image = new Image();
    this.image.src = imageSrc;

    this.image.onload = () => {
      this.width = this.image.width;
      this.height = this.image.height;
    
      context.drawImage(this.image, 0, 0);
      this.data = context.getImageData(0, 0, this.width, this.height).data;

      context.clearRect(0, 0, width, height);
      
      getParticles();
    }
  }();
  
  canvas.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
  })
  
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
        index: i,
        color: `rgba(${image.data[i]}, ${image.data[i + 1]}, ${
          image.data[i + 2]
        }, ${image.data[i + 3]})`
      })
    );
  }

  return (props) => {
    ({ width, height } = props);

    tick++;

    if (tick % 11000 === 0) {
      // reset animation
      getParticles();
    }

    if (image.width && image.height) {
      context.translate(width / 2 - image.width / 2 * 3, height / 2 - image.height / 2 * 3);
      context.fillStyle = 'white';
      context.fillRect(0, 0, 700, 500);
    }

    particles.forEach((particle, i) => {
      if (particle.y >= 700) {
        particles.splice(i, 1);
      }
      particle.draw();
    })
  }
};

export default setSketch(
  sketch,
  { animate: true }
);