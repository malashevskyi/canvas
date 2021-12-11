class Cartridge {
  context: CanvasRenderingContext2D
  x: number
  y: number
  dx: number
  dy: number
  angle: number

  constructor(args) {
    Object.assign(this, args)
  }

  draw() {
    this.context.beginPath()
    this.context.save()
    this.context.translate(this.x, this.y)
    this.context.rotate(this.angle)
    this.context.moveTo(0, 0)
    this.context.lineTo(0 + 20, 0)
    this.context.lineTo(0 + 20, 5)
    this.context.lineTo(0, 5)
    this.context.fillStyle = 'red'
    this.context.closePath()
    this.context.fill()
    this.context.restore()
  }

  update() {
    this.x += this.dx
    this.y += this.dy
  }
}

export default Cartridge
