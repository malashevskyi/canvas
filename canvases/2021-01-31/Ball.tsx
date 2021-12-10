type OptType = {
  curve: string
}

class Ball {
  context
  angle: number
  color: string
  opt: OptType
  tick: number = 0
  x: number = 0
  y: number = 0
  m: number = 5
  dx: number
  dy: number
  radius: number = 10

  constructor(context, angle, opt, color) {
    this.context = context
    this.angle = angle
    this.color = color
    this.opt = opt
    this.dx = Math.random() * this.m + 5
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
    this.tick += 0.5
    this.dy = this.opt.curve ? Math.sin(this.tick) * this.m : 1
    this.x += this.dx
    this.y = this.dy
    this.draw()
  }
}

export default Ball
