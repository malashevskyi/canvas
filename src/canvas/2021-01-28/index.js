import setSketch from '../../utils/setSketch';
import Square from './Square';
import getGui from '../../utils/getGui';

const sketch = ({ context, width, height }) => {
  const points = [];
  const outerPoints = [];
  let opt = {
    count: 1600,
    squareSideHalf: 40
  }

  // getPCount
  let widthCount, heightCount;
  // setM
  let maxSide, minSide, edgeOffset, widthHalf, heightHalf;

  let perimeter, frequency;

  function setM() {
    widthHalf = width / 2;
    heightHalf = height / 2;
    maxSide = Math.max(width, height);
    minSide = Math.min(width, height);
    edgeOffset = minSide / 4;
  }
  setM();

  function getPerimeter() {
    perimeter = (width - edgeOffset * 2) * 2 + (height - edgeOffset * 2) * 2;
  }
  getPerimeter();

  function getPerimeterFrequency() {
    frequency = perimeter / opt.count;
  }
  getPerimeterFrequency();

  function getPCount() {
    widthCount = Math.ceil((width - edgeOffset * 2) / frequency);
    heightCount = Math.ceil((height - edgeOffset * 2) / frequency);
  }
  getPCount();

  function getOuterPoints() {
    outerPoints.length = 0;
    for (let i = 0; i < widthCount; i++) {
      outerPoints.push([i * frequency - widthHalf + edgeOffset + opt.squareSideHalf, 0 - heightHalf + edgeOffset + opt.squareSideHalf]);
      outerPoints.push([i * frequency - widthHalf + edgeOffset + opt.squareSideHalf, heightHalf - edgeOffset + opt.squareSideHalf]);
    }
    for (let i = 0; i < heightCount; i++) {
      outerPoints.push([0 - widthHalf + edgeOffset + opt.squareSideHalf, i * frequency - heightHalf + edgeOffset + opt.squareSideHalf]);
      outerPoints.push([widthHalf - edgeOffset + opt.squareSideHalf, i * frequency - heightHalf + edgeOffset + opt.squareSideHalf]);
    }
  }
  getOuterPoints();

  function getSquares() {
    const s = Math.floor(Math.sqrt(opt.count));
    let i = 0;
    points.length = 0;
    for (let y = 0; y < s * 2; y += 2) {
      for (let x = 0; x < s * 2; x += 2) {
        i++;
        points.push(new Square(context, maxSide, [x, y], outerPoints[i], opt.squareSideHalf))
      }
    }
  }
  getSquares();

  function update() {
    opt.squareSideHalf = Math.ceil(Math.sqrt(opt.count)) + 2;
    setM();
    getPerimeter();
    getPerimeterFrequency();
    getPCount();
    getOuterPoints();
    getSquares();
  }

  getGui((gui) => {
    gui.add(opt, 'count').min(500).max(10000).step(100).name('Count of dots').onChange(update);
  })

  return {
    render(props) {
      ({height, width} = props)
      
      context.fillStyle = 'rgb(20, 20, 20)';
      context.fillRect(0, 0, width, height);
      context.translate(width / 2 - opt.squareSideHalf, height / 2 - opt.squareSideHalf);
      
      for (let i = 0; i < points.length; i++) {
        points[i].render();
      }
    },
    resize(props) {
      ({height, width} = props);
      update();
    }
  }
};

export default setSketch(
  sketch,
  { animate: true }
);