import useCanvas from '../../hooks/useCanvas'

const sketch = ({ context, height, width }) => {
  const lines = []
  const lineWidth = 30

  class Line {
    yStart: number
    color: string
    offset: number
    waveWidth: number
    angle: number
    frameTick: number = 0
    radiusWave: number = 100
    constructor(args) {
      Object.assign(this, args)
      this.angle = (Math.PI * 4) / this.waveWidth
    }

    draw() {
      this.frameTick += 2

      context.beginPath()
      // draw rect
      // start, top-left
      context.moveTo(0, this.yStart)
      // before top wave
      context.lineTo(this.offset, this.yStart)

      // top wave
      for (let i = 0; i < this.waveWidth; i += 10) {
        // angle = circle / 400
        // Math.cos(0) and Math.cos(400) = 1 (full radius)
        const sinRadius = 70
        const sinOffsetTime = this.yStart / 2
        const yRadius =
          Math.sin((this.frameTick + sinOffsetTime) * this.angle) * sinRadius

        const y = this.yStart - yRadius + Math.cos(this.angle * i) * yRadius
        context.lineTo(this.offset + i, y)
      }

      // after top wave
      context.lineTo(this.offset + this.waveWidth, this.yStart)
      // top-right
      context.lineTo(width, this.yStart)
      // bottom-right
      context.lineTo(width, this.yStart + lineWidth)

      // before bottom wave (from right to left)
      context.lineTo(this.offset + this.waveWidth, this.yStart + lineWidth)

      // bottom wave
      for (let i = this.waveWidth; i > 0; i -= 10) {
        // angle = circle / 400
        // Math.cos(0) and Math.cos(400) = 1 (full radius)
        const sinRadius = 70
        const sinOffsetTime = this.yStart / 2
        const yRadius =
          Math.sin((this.frameTick + sinOffsetTime) * this.angle) * sinRadius

        const y =
          this.yStart - yRadius + Math.cos(this.angle * i) * yRadius + lineWidth
        context.lineTo(this.offset + i, y)
      }

      // after bottom wave (from right to left)
      context.lineTo(this.offset, this.yStart + lineWidth)

      // bottom-left
      context.lineTo(0, this.yStart + lineWidth)
      context.closePath()
      context.fillStyle = this.color
      context.fill()
    }
  }

  for (let i = 0; i < height; i += lineWidth) {
    lines.push(
      new Line({
        yStart: i,
        color: `hsl(${i * 10}, 50%, 50%)`,
        offset: -300 + i,
        waveWidth: 1600,
      })
    )
  }

  return (updatedProps) => {
    ;({ width, height } = updatedProps)

    context.fillRect(0, 0, width, height)

    lines.forEach((line) => {
      line.draw()
    })
  }
}

function Canvas() {
  useCanvas({ sketch: () => sketch })

  return ''
}
export default Canvas
