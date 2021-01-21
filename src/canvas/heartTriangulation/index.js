import setSketch from '../../utils/setSketch';
import Triangle from './Triangle';
import trianglesPoints from './trianglesPoints';

window.HeartTriangulation = {
  triangles: []
};

const sketch = ({ context, width, height }) => {

  function generateTriangles() {
    const angle = (Math.PI * 2) / trianglesPoints.length;
    const radius = Math.max(width, height);
    trianglesPoints.forEach((array, i) => {
      const radiusM = radius + radius * 0.2 * Math.random();
      let a = 70;
      let last = i === trianglesPoints.length - 1;
      window.HeartTriangulation.triangles.push(
        new Triangle(
          context,
          array,
          Math.sin(angle * (i + a)) * radiusM,
          Math.cos(angle * (i + a)) * radiusM,
          last
        )
      );
    });
  }

  if (window.HeartTriangulation.triangles.length === 0) {
    generateTriangles();
  }

  return (props) => {
    ({ width, height } = props);
    context.clearRect(0, 0, width, height);

    context.save();
    context.translate(width / 2 - 283, height / 2 - 274);

    window.HeartTriangulation.triangles.forEach((triangle) => {
      triangle.draw();
      triangle.tl.play();
    });

    context.fill();
    context.restore();
  };
};

export default setSketch(sketch, { animate: true });
