import math from 'canvas-sketch-util/math'

const smooth = [
  ...math.linspace(80, 0, 1),
  ...Array(200).fill(1),
  ...math.linspace(80, 0, 1).reverse(),
]

class Circle {
  context: CanvasRenderingContext2D
  radius: number
  offsetAngle: number
  color: string

  constructor(args) {
    Object.assign(this, args)
  }

  draw(widthHalf, heightHalf, startAngle) {
    this.context.strokeStyle = this.color

    this.context.beginPath()

    for (let i = 0; i < 360; i++) {
      const angle = ((i + startAngle) * Math.PI) / 180

      const ampRadius = 10
      const amp = smooth[i] * Math.sin(angle * 6 + this.offsetAngle) * ampRadius
      const x = widthHalf + Math.cos(angle) * (this.radius + amp)
      const y = heightHalf + Math.sin(angle) * (this.radius + amp)
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
