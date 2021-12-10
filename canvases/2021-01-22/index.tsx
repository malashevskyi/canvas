import random from 'canvas-sketch-util/random'
import palettes from 'nice-color-palettes'
import useCanvas from '../../hooks/useCanvas'

const sketch = ({ context, height, width }) => {
  random.setSeed(2)

  const radius = 50
  const amplitude = 30
  const count = 15
  let xRight = 0
  let xLeft = 0
  let tick = 0
  const opt = {
    yOffset: 47,
    stopLeft: false,
  }
  const palette = [
    ...random.pick(palettes),
    ...random.pick(palettes),
    ...random.pick(palettes),
  ]
  context.fillStyle = 'white'
  context.fillRect(0, 0, width, height)

  return (updatedProps) => {
    ;({ width, height } = updatedProps)

    tick += 1

    const y = Math.sin((xRight + opt.yOffset) / amplitude) * radius

    if (xRight < width / 2 - 10) {
      for (let i = 0; i < count; i++) {
        context.save()
        context.fillStyle = palette[i]

        // from the center to the right
        const ofs = (height / count) * i - radius + 50

        context.save()
        context.translate(width / 2, 0)
        context.beginPath()
        context.moveTo(xRight, y + ofs)
        context.lineTo(xRight + width / 2, y + ofs)
        context.lineTo(xRight + width / 2, height + ofs)
        context.lineTo(xRight, height + ofs)
        context.fill()
        context.restore()
        // from the center to the left
        context.save()
        context.translate(width / 2, 0)
        context.beginPath()
        context.moveTo(xLeft, y + ofs)
        context.lineTo(xLeft - width / 2, y + ofs)
        context.lineTo(xLeft - width / 2, height + ofs)
        context.lineTo(xLeft, height + ofs)
        context.fill()
        context.restore()
        context.restore()
      }

      // animation delay
      if (tick > 40) {
        xRight += 1
        if (!opt.stopLeft) {
          xLeft -= 1
        }
      }
    }
  }
}

function Canvas() {
  useCanvas({ sketch: () => sketch })

  return ''
}
export default Canvas
