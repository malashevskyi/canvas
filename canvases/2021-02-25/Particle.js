import random from 'canvas-sketch-util/random';

class Particle {
  constructor({ context, uX, uY, opt, image }) {
    this.context = context;
    this.uX = uX;
    this.uY = uY;
    this.x = (Math.random() - 0.5) * opt.screenRadius;
    this.y = (Math.random() - 0.5) * opt.screenRadius;
    this.random = random.gaussian();
    this.opt = opt;
    this.image = image;
  }

  draw() {
    this.context.drawImage(
      this.image,
      (this.image.width / this.opt.squaresCount) * this.uX,
      (this.image.height / this.opt.squaresCount) * this.uY,
      this.image.width / this.opt.squaresCount,
      this.image.height / this.opt.squaresCount,
      (this.opt.squareWidth + this.opt.offset) * this.uX + this.x,
      (this.opt.squareHeight + this.opt.offset) * this.uY + this.y,
      this.opt.squareWidth,
      this.opt.squareHeight
    );
  }

  update() {
    this.draw();
  }
}

export default Particle;
