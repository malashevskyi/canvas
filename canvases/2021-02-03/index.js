import useCanvas from '../../hooks/useCanvas';
import Circle from './Circle';

const sketch = () => (initialProps) => {
  const { context } = initialProps;
  let { height, width, time } = initialProps;

  let startAngle = 0;
  let widthHalf, heightHalf;

  const opt = {
    count: 15,
    offset: 30,
    radius: 200,
    waveOffset: 100,
  };
  const circles = [];

  function getCircles() {
    for (let i = opt.count; i > 0; i--) {
      circles.push(
        new Circle({
          context,
          radius: opt.radius + opt.offset * i,
          offsetAngle: (i * opt.waveOffset * Math.PI) / 180,
        })
      );
    }
  }
  getCircles();

  return {
    render(updatedProps) {
      ({ width, height, time } = updatedProps);

      widthHalf = width / 2;
      heightHalf = height / 2;

      startAngle++;

      context.clearRect(0, 0, width, height);

      circles.forEach((circle, i) => {
        circle.color = `hsl(${i * 5 + time * 10 + 110}, 50%, 50%)`;
        circle.draw(widthHalf, heightHalf, startAngle);
      });
    },
  };
};

function Canvas({ gui }) {
  useCanvas({ sketch: () => sketch({ gui }) });
  return '';
}

export default Canvas;
