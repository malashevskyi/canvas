import setSketch from '../../utils/setSketch';
import Particle from './Particle';
import gsap from 'gsap';
import { debounceNotification } from '../../utils/debounce';

const imageSrc = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyNS4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCA0MDMuMyA3NS4zIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0MDMuMyA3NS4zOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8Zz4NCgk8cGF0aCBkPSJNNjAuMyw2OC44Yy0xLjgsMC44LTMuNCwxLjUtNC45LDIuMmMtMS40LDAuNy0zLjMsMS40LTUuNywyLjFjLTIsMC42LTQuMSwxLjEtNi41LDEuNmMtMi4zLDAuNC00LjksMC43LTcuNywwLjcNCgkJYy01LjMsMC0xMC4xLTAuNy0xNC40LTIuMmMtNC4zLTEuNS04LjEtMy44LTExLjMtN2MtMy4xLTMuMS01LjYtNy03LjMtMTEuOEMwLjksNDkuNiwwLDQ0LjEsMCwzNy43YzAtNiwwLjgtMTEuMywyLjUtMTYuMQ0KCQlDNC4yLDE3LDYuNywxMyw5LjksOS43YzMuMS0zLjIsNi44LTUuNiwxMS4yLTcuMkMyNS40LDAuOCwzMC4zLDAsMzUuNiwwYzMuOSwwLDcuOCwwLjUsMTEuNywxLjRjMy45LDAuOSw4LjIsMi42LDEzLDV2MTEuNWgtMC43DQoJCWMtNC0zLjQtOC01LjgtMTEuOS03LjNDNDMuNyw5LDM5LjUsOC4zLDM1LDguM2MtMy43LDAtNywwLjYtOS45LDEuOGMtMi45LDEuMi01LjYsMy03LjksNS41Yy0yLjIsMi40LTQsNS41LTUuMiw5LjMNCgkJYy0xLjMsMy43LTEuOSw4LTEuOSwxMi45YzAsNS4xLDAuNyw5LjUsMi4xLDEzLjJjMS40LDMuNywzLjIsNi43LDUuMyw5YzIuMywyLjQsNC45LDQuMiw4LDUuM2MzLDEuMiw2LjMsMS43LDkuNiwxLjcNCgkJYzQuNywwLDktMC44LDEzLjEtMi40YzQuMS0xLjYsNy45LTQsMTEuNC03LjJoMC43VjY4Ljh6Ii8+DQoJPHBhdGggZD0iTTEzMS4zLDc0SDEyMWwtNy4xLTIwLjNIODIuNEw3NS4zLDc0aC05LjhMOTEuOSwxLjNoMTIuOUwxMzEuMyw3NHogTTExMC45LDQ1LjVMOTguMSw5LjhMODUuNCw0NS41SDExMC45eiIvPg0KCTxwYXRoIGQ9Ik0xOTcuOCw3NGgtMTJMMTUxLjQsOXY2NWgtOVYxLjNoMTVsMzEuNCw1OS40VjEuM2g5Vjc0eiIvPg0KCTxwYXRoIGQ9Ik0yNzQuNSwxLjNMMjQ4LDc0aC0xMi45TDIwOC42LDEuM0gyMTlsMjIuOCw2NGwyMi44LTY0SDI3NC41eiIvPg0KCTxwYXRoIGQ9Ik0zMzkuOSw3NGgtMTAuM2wtNy4xLTIwLjNIMjkxTDI4My45LDc0aC05LjhsMjYuNS03Mi43aDEyLjlMMzM5LjksNzR6IE0zMTkuNSw0NS41TDMwNi43LDkuOGwtMTIuOCwzNS43SDMxOS41eiIvPg0KCTxwYXRoIGQ9Ik00MDMuMyw1My4zYzAsMi44LTAuNyw1LjYtMiw4LjRjLTEuMywyLjgtMy4yLDUuMS01LjUsN2MtMi42LDIuMS01LjYsMy43LTkuMSw0LjlzLTcuNiwxLjgtMTIuNSwxLjgNCgkJYy01LjIsMC0xMC0wLjUtMTQuMS0xLjVjLTQuMi0xLTguNC0yLjQtMTIuOC00LjNWNTcuNGgwLjdjMy43LDMuMSw3LjksNS40LDEyLjcsNy4xYzQuOCwxLjcsOS4zLDIuNSwxMy42LDIuNWM2LDAsMTAuNy0xLjEsMTQtMy40DQoJCWMzLjMtMi4yLDUtNS4yLDUtOWMwLTMuMi0wLjgtNS42LTIuNC03LjFjLTEuNi0xLjUtNC0yLjctNy4yLTMuNmMtMi40LTAuNy01LjEtMS4yLTcuOS0xLjZjLTIuOC0wLjQtNS45LTEtOS4xLTEuNg0KCQljLTYuNC0xLjQtMTEuMi0zLjctMTQuMy03Yy0zLjEtMy4zLTQuNy03LjYtNC43LTEyLjljMC02LjEsMi42LTExLjEsNy43LTE1QzM2MC41LDEuOSwzNjcsMCwzNzUsMGM1LjEsMCw5LjgsMC41LDE0LjEsMS41DQoJCWM0LjMsMSw4LDIuMiwxMS4zLDMuNnYxMS40aC0wLjdjLTIuOC0yLjMtNi40LTQuMy0xMC45LTUuOGMtNC41LTEuNS05LjEtMi4zLTEzLjgtMi4zYy01LjIsMC05LjMsMS4xLTEyLjUsMy4yDQoJCWMtMy4xLDIuMS00LjcsNC45LTQuNyw4LjNjMCwzLDAuOCw1LjQsMi4zLDcuMWMxLjYsMS43LDQuMywzLDguMyw0YzIuMSwwLjUsNSwxLDguOSwxLjdjMy44LDAuNyw3LjEsMS4zLDkuOCwyDQoJCWM1LjQsMS40LDkuNSwzLjYsMTIuMiw2LjVDNDAxLjksNDQsNDAzLjMsNDguMSw0MDMuMyw1My4zeiIvPg0KPC9nPg0KPC9zdmc+DQo=";

const sketch = ({ context, width, height, canvas }) => {
  window.timeout = setTimeout(() => {
    debounceNotification('Move mouse to push particles');
  }, 5000);

  const particles = [];
  const particlesTo = [];
  const mouse = {
    x: 10000,
    y: 10000,
    radius: 70,
  }
  let tick = 0;
  let alpha = 0.2;
  
  canvas.addEventListener('mousemove', (event) => {
    if (tick > 150) {
      mouse.x = event.x - width / 2;
      mouse.y = event.y - height / 2;
    }
  })
  
  const image = new function() {
    this.image = new Image();
    this.image.src = imageSrc;
    this.width = 170;
    this.height = 30;

    this.image.onload = () => {
      context.fillStyle = 'white'
      context.fillRect(0, 0, this.width, this.height);
      context.drawImage(this.image, 0, 0, this.width, this.height);
      this.data = context.getImageData(0, 0, this.width, this.height).data;

      context.clearRect(0, 0, width, height);
      
      getParticles();
      animateParticles();
    }
  }();
  
  function getParticles() {
    // reset particles
    particles.length = 0;
    
    let i = 0;
    for (let y = 0; y < image.height; y++) {
      for (let x = 0; x < image.width; x++) {
        // each coordinate has "r", "g", "b" and "a" value
        // add particle if "r" is not black (0)
        if (image.data[i] < 100) addParticle(x, y, i);
        i += 4;
      }
    }
  }
  
  function addParticle(x, y, i) {
    const screenRadius = Math.sqrt(width * width + height * height) / 2;

    // set circle x and circle y with screen radius
    particles.push(new Particle({
      context,
      x: Math.cos(i) * screenRadius,
      y: Math.sin(i) * screenRadius,
    } ));

    const textOffsetX = 300;
    const textOffsetY = 55;
    // multiply every coordinate by 3 as it has 2px length + offset 1px
    particlesTo.push(new Particle({
      context,
      x: x * 3 - textOffsetX,
      y: y * 3 - textOffsetY,
    }));
  }

  function animateParticles() {
    particles.forEach((particle, i) => {
      gsap.to(particle, {
        duration: 5,
        ...particlesTo[i],
        delay: 'random(0, 3.5)'
      })
    })
  }

  function drawMouseCircle() {
    context.beginPath();
    context.fillStyle = 'rgba(255, 255, 255, 0.03)';
    context.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2)
    context.fill();
    context.restore()
  }

  return (props) => {
    ({ width, height } = props);

    tick++;

    context.fillStyle = `rgba(10, 10, 10, ${alpha})`
    context.fillRect(0, 0, width, height);

    if (tick > 250) {
      alpha += 0.01;
    }

    context.save();
    context.translate(width / 2, height / 2);
    particles.forEach(particle => {
      particle.draw();
      particle.update(mouse);
    })
    
    drawMouseCircle();

  }
};

export default setSketch(
  sketch,
  { animate: true }
);