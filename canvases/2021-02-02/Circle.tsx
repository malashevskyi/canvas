import math from 'canvas-sketch-util/math'

const smooth = [
  ...math.linspace(80, 0),
  ...Array(200).fill(1),
  ...math.linspace(80, 0).reverse(),
]

class Circle {
  context: CanvasRenderingContext2D
  radius: number
  offsetAngle: number
  index: number
  tick: number = 0
  color: string

  constructor(args) {
    Object.assign(this, args)
  }

  draw(startAngle, width, height) {
    this.tick += 1
    this.color = `hsl(${this.index * 5 + this.tick / 5 + 110}, 50%, 50%)`

    this.context.beginPath()

    for (let i = 0; i < 360; i++) {
      const angle = ((i + startAngle) * Math.PI) / 180

      const ampRadius = 10
      const amp = smooth[i] * Math.sin(angle * 6 + this.offsetAngle) * ampRadius
      const x = width / 2 + Math.cos(angle) * (this.radius + amp)
      const y = height / 2 + Math.sin(angle) * (this.radius + amp)
      if (i > 0) {
        this.context.lineTo(x, y)
      } else {
        this.context.moveTo(x, y)
      }
    }
    this.context.closePath()
    this.context.fillStyle = this.color
    this.context.fill()
  }
}

export default Circle
