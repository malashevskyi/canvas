import useCanvas from '../../hooks/useCanvas';
import useNotification from '../../hooks/useNotification';

const sketch = () => (initialProps) => {
  const { context, canvas } = initialProps;
  let { height, width } = initialProps;

  const motionTrailLength = 20;
  let xPos = width / 2;
  let yPos = height / 2;
  const circles = [];

  class DrawCircle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }

    draw(a) {
      let radius = 50;
      
      if (a !== 1) {
        radius = 220 * (a / 4);
      }

      context.beginPath();
      context.arc(this.x, this.y, radius, 0, 2 * Math.PI, true);
      context.fillStyle = 'rgba(254, 231, 21, ' + a + ')';
      context.fill();
    }
  }

  function mouseMoveHandler(e) {
    xPos = e.offsetX;
    yPos = e.offsetY;
  }

  function touchMoveHandler(e) {
    e.preventDefault();
    xPos = e.changedTouches[0].clientX;
    yPos = e.changedTouches[0].clientY;
  }

  function addCircle() {
    const lastCircle = new DrawCircle(xPos, yPos);
    circles.push(lastCircle);
    lastCircle.draw(1);
  }

  function removeFirstCircle() {
    if (circles.length > motionTrailLength) circles.shift();
  }

  function drawCircles() {
    circles.forEach((circle, i) => {
      const alpha = (i + 1) / circles.length;
      circle.draw(alpha);
    });
  }

  function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#101820FF';
    context.fillRect(0, 0, width, height);
  }

  canvas.addEventListener('mousemove', mouseMoveHandler);
  canvas.addEventListener('touchmove', touchMoveHandler);

  return (updatedProps) => {
    ({ height, width } = updatedProps);

    clearCanvas();

    drawCircles();

    addCircle();
    removeFirstCircle();
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
