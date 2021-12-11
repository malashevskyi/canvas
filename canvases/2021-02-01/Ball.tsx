class Ball {
  context: CanvasRenderingContext2D
  angle: number
  color: string
  tick: number = 0
  x: number = 0
  y: number = 0
  m: number = 10
  dx: number = Math.random() * 2 + 2
  dy: number = 1
  dyInit: number = 1
  radius: number = 10

  constructor(context, angle, color) {
    this.context = context
    this.angle = angle
    this.color = color
  }

  draw() {
    this.context.save()
    this.context.rotate(this.angle)
    this.context.beginPath()
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    this.context.fillStyle = this.color
    this.context.closePath()
    this.context.fill()
    this.context.restore()
  }

  render() {
    this.tick += 0.05
    if (this.tick > 5 && this.radius > 0.2) {
      this.radius -= 0.02
    }
    if (this.radius <= 0.2) this.radius = 0

    this.dy += Math.sin(this.tick) * this.m

    if (this.dy > 20 || this.dy < -20) {
      this.dyInit = -this.dyInit
    }
    this.x += this.dx
    this.y = this.dy
    this.draw()
  }
}

export default Ball
