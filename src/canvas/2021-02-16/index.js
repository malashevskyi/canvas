import gsap from 'gsap';

import setSketch from '../../utils/setSketch';
import imageSrc from '../../images/canvas/mountains800-560.jpg';

const sketch = ({ context, width, height }) => {

  const image = new Image();
  image.src = imageSrc;

  let drawImage;
  // image 800 X 560
  const squaresCountX = 10;
  const squaresCountY = 7;
  const squareWidth = 80; // 800 / 10 (squaresCountX)
  const squareHeight = 80; // 800 / 7 (squaresCountY)

  const opt = {
    offset: 0,
    offset2: 0
  }

  image.onload = () => {
    drawImage = () => {
      for (let x = 0; x < squaresCountX; x++) {
        for (let y = 0; y < squaresCountY; y++) {
          // you can get the same result with scaling context (image) and
          // drawing lines over the image, but if you don't use background
          context.drawImage(
            image,
            image.width / squaresCountX * x,
            image.height / squaresCountY * y,
            image.width / squaresCountX,
            image.height / squaresCountY,
            (squareWidth + opt.offset) * x,
            (squareHeight + opt.offset) * y,
            squareWidth,
            squareHeight
          );
        }
      }
    }
    gsap.to(opt, { duration: 1, delay: 0.7, offset: 30, repeat: -1, repeatDelay: 0.5, yoyo: true, ease: 'none' });
  }

  return (props) => {
    ({ width, height } = props);

    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);
    
    // background
    for(let i = width / 80; i < width / 40; i++) {
      context.beginPath();
      context.moveTo(i * 40, 0);
      context.lineTo(0, i * 40);
      context.strokeStyle = 'white';
      context.stroke();
      context.closePath();
    }

    context.translate(
      width / 2 - (squaresCountX * squareWidth / 2) - (squaresCountX * opt.offset / 2),
      height / 2 - (squaresCountY * squareHeight / 2) - (squaresCountY * opt.offset / 2)
    );

    if (drawImage) {
      drawImage();
    }
  }
};

export default setSketch(
  sketch,
  { animate: true }
);