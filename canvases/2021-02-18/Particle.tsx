class Particle {
  context
  x: number
  y: number
  color: string
  alpha: number = 1
  constructor(args) {
    Object.assign(this, args)
  }

  draw() {
    this.context.save()
    this.context.globalAlpha = this.alpha
    this.context.beginPath()
    this.context.fillStyle = this.color
    this.context.rect(this.x, this.y, 2, 2)
    this.context.closePath()
    this.context.fill()
    this.context.restore()
  }
}

export default Particle
