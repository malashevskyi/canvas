import setSketch from '../../utils/setSketch';
import heartPoints from './heartPoints';
import trianglesPoints from './trianglesPoints';
import Dot from './Dot';
import Triangle from './Triangle';
import connectDots from './connectDots';

window.MainCanvas = {
  triangles: [],
  heartAlpha: { value: 0 }
};

const sketch = ({ context, width, height }) => {
  const angle = (Math.PI * 2) / trianglesPoints.length;
  const radius = Math.max(width, height);
  const triangles = window.MainCanvas.triangles;
  const dots = [];
  
  function generateTriangles() {
    trianglesPoints.forEach((array, i) => {
      const radiusM = radius + (radius * 0.2) * Math.random();
      const rotateAngle = 70;

      triangles.push(
        new Triangle({
          context,
          position: array,
          sin: Math.sin(angle * (i + rotateAngle)) * radiusM,
          cos: Math.cos(angle * (i + rotateAngle)) * radiusM,
          last: i === trianglesPoints.length - 1 ? true : false
        })
      );
    });
  }
  if (triangles.length === 0) {
    // generate triangles for the first heart only once, 
    // changing routes doesn't effect it
    generateTriangles();
  }

  function getDots() {
    // dots for the second heart
    heartPoints.forEach((point) => {
      dots.push(new Dot(context, point[0], point[1]));
    });
  }

  function getHeart() {
    // the second heart
    const { value: alpha } = window.MainCanvas.heartAlpha;
    context.save();
    context.translate(width / 2, height / 2);
    context.beginPath();
    connectDots(context, dots);
    context.fillStyle = `rgba(255, 0, 0, ${alpha})`;
    context.fill();

    dots.forEach((dot) => {
      dot.render();
      // dot.draw();
    });
    context.restore();
  }

  function getTriangles() {
    // the first heart
    context.save();
    context.translate(width / 2 - 283, height / 2 - 274);
    triangles.forEach((triangle) => {
      triangle.draw();
      triangle.tl.play();
    });
    context.restore();
  }

  getDots();

  return (props) => {
    ({ width, height } = props);

    context.clearRect(0, 0, width, height);

    // get the first heart
    getTriangles(); 
    // get the second heart
    getHeart();
  };
};

export default setSketch(sketch, { animate: true });
