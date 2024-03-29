function inRange(axis, start, end) {
  return axis > start && axis < end
}
class Ball {
  context: CanvasRenderingContext2D
  x: number
  y: number
  dx: number
  dy: number
  color: string

  constructor(args) {
    Object.assign(this, args)
  }

  draw(width, height, radius) {
    if (!inRange(this.x, radius, width - radius)) this.dx = -this.dx
    if (!inRange(this.y, radius, height - radius)) this.dy = -this.dy

    this.x += this.dx
    this.y += this.dy

    this.context.beginPath()
    this.context.arc(this.x, this.y, radius, 0, Math.PI * 2)
    this.context.fillStyle = this.color
    this.context.fill()
    this.context.closePath()
  }
}

export default Ball
