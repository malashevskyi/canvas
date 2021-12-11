import random from 'canvas-sketch-util/random'

class Particle {
  context: CanvasRenderingContext2D
  x: number
  y: number
  radius: number
  color: string
  speed: {
    x: number
    y: number
  }
  alpha: number = 1

  constructor(context, x, y, radius, color, speed) {
    this.context = context
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.speed = speed
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
    this.speed.x *= random.range(0.65, 1.45)
    this.speed.y *= random.range(0.65, 1.45)
    this.x += this.speed.x
    this.y += this.speed.y
    this.alpha -= 0.008
  }
}

export default Particle
