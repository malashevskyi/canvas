import Cartridge from './Cartridge'

class Gun {
  context
  anchorX: number
  anchorY: number
  x: number
  y: number
  radius: number
  theta: number = 0
  constructor(args) {
    Object.assign(this, args)
    this.anchorX = this.x
    this.anchorY = this.y
  }

  draw(mouse) {
    // first big circle (red)
    this.context.beginPath()
    this.context.arc(this.anchorX, this.anchorY, this.radius, 0, Math.PI * 2)
    this.context.fillStyle = 'red'
    this.context.closePath()
    this.context.fill()

    // find mouse/gun angle
    const dx = mouse.x - this.anchorX
    const dy = mouse.y - this.anchorY
    this.theta = Math.atan2(dy, dx)

    // offset second circle
    this.x = this.anchorX + (Math.cos(this.theta) * this.radius) / 10
    this.y = this.anchorY + (Math.sin(this.theta) * this.radius) / 10

    // second circle (white)
    this.context.beginPath()
    this.context.arc(this.x, this.y, this.radius * 0.9, 0, Math.PI * 2)
    this.context.fillStyle = 'white'
    this.context.closePath()
    this.context.fill()

    // offset third small circle
    this.x = this.anchorX + (Math.cos(this.theta) * this.radius) / 1.8
    this.y = this.anchorY + (Math.sin(this.theta) * this.radius) / 1.8

    // third small circle (black)
    this.context.beginPath()
    this.context.arc(this.x, this.y, this.radius * 0.4, 0, Math.PI * 2)
    this.context.fillStyle = 'black'
    this.context.closePath()
    this.context.fill()
  }

  getCartridge() {
    return new Cartridge({
      context: this.context,
      x: this.x,
      y: this.y,
      dx: Math.cos(this.theta) * 10,
      dy: Math.sin(this.theta) * 10,
      angle: this.theta,
    })
  }
}

export default Gun
