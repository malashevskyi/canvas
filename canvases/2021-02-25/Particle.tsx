import random from 'canvas-sketch-util/random'

type ImageType = {
  width: number
  height: number
}
type OptType = {
  squaresCount: number
  squareWidth: number
  squareHeight: number
  offset: number
  screenRadius: number
}

class Particle {
  context
  uX: number
  uY: number
  x: number
  y: number
  random: number = random.gaussian()
  opt: OptType
  image: ImageType

  constructor(args) {
    Object.assign(this, args)
    this.x = (Math.random() - 0.5) * this.opt.screenRadius
    this.y = (Math.random() - 0.5) * this.opt.screenRadius
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
    )
  }

  update() {
    this.draw()
  }
}

export default Particle
