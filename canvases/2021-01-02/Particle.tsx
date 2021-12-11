import { lerp } from 'canvas-sketch-util/math'

type VelocityType = {
  x: number
  y: number
}

class Particle {
  context: CanvasRenderingContext2D
  x: number
  y: number
  radius: number
  color: null
  velocity: VelocityType
  alpha: number

  constructor(args) {
    Object.assign(this, args)

    this.alpha = 1
  }

  draw() {
    this.context.save()
    this.context.globalAlpha = this.alpha
    this.context.beginPath()
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    this.context.fillStyle = this.color
    this.context.fill()
    this.context.restore()
  }

  render() {
    this.draw()
    this.velocity.x *= lerp(0.85, 1.02, Math.random())
    this.velocity.y *= lerp(0.85, 1.02, Math.random())
    this.velocity.y += 0.05
    this.x += this.velocity.x
    this.y += this.velocity.y
    this.alpha -= 0.018
  }
}

export default Particle
