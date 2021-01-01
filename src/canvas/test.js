import setSketch from '../utils/setSketch';

const sketch = () => {
  return ({ context, width, height }) => {
    context.beginPath();
    context.fillStyle = 'yellow';
    context.fillRect(0, 0, width, height);
  };
};

export default setSketch(sketch, {
  dimensions: [1000, 1000],
});
