import Circle from './Circle';
import useCanvas from '../../hooks/useCanvas';
import { useNotification } from '../../hooks/useNotification';

const sketch = ({ gui }) => (initialProps) => {
  const { context, canvas } = initialProps;
  let { height, width } = initialProps;

  const opt = {
    radius: 40,
    trailLength: 15,
  };
  let xPos = width / 2;
  let yPos = height / 2;
  let circles = Array(opt.trailLength).fill('');

  function storeLastPosition(xPos, yPos) {
    circles.unshift(new Circle(context, xPos, yPos, opt.radius));
    circles.pop();
  }

  function styleRect() {
    context.clearRect(0, 0, width, height);
    context.fillStyle = `hsl(${250}, 50%, 50%)`;
    context.fillRect(0, 0, width, height);
  }

  function mouseMoveHandler(e) {
    xPos = (height / canvas.offsetHeight) * e.offsetX;
    yPos = (width / canvas.offsetWidth) * e.offsetY;
  }
  function touchMoveHandler(e) {
    e.preventDefault();
    xPos = e.changedTouches[0].clientX;
    yPos = e.changedTouches[0].clientY;
  }
  canvas.addEventListener('mousemove', mouseMoveHandler);
  canvas.addEventListener('touchmove', touchMoveHandler);

  gui?.show();
  gui?.add(opt, 'radius').step(1).min(10).max(100).name('Radius');
  gui?.add(opt, 'trailLength')
    .step(1)
    .min(10)
    .max(100)
    .name('Count')
    .onChange(() => {
      circles = Array(opt.trailLength).fill('');
    });

  return (updatedProps) => {
    ({ height, width } = updatedProps);
    styleRect();
    circles.forEach((circle, i) => {
      let radius = (i + 1) / circles.length;
      circle.draw?.(radius, `hsl(${250 + 5 * i}, 50%, 50%)`);
    });
    storeLastPosition(xPos, yPos);
  };
};

function Canvas({ gui }) {
  useCanvas({ sketch: () => sketch({ gui }) });
  useNotification({
    message: 'Move mouse to change position',
  });

  return '';
}

export default Canvas;
