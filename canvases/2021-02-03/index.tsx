import useCanvas from '../../hooks/useCanvas'
import Circle from './Circle'

const sketch = ({ context, height, width, time }) => {
  let startAngle = 0
  let widthHalf, heightHalf

  const opt = {
    count: 15,
    offset: 30,
    radius: 200,
    waveOffset: 100,
  }
  const circles = []

  function getCircles() {
    for (let i = opt.count; i > 0; i--) {
      circles.push(
        new Circle({
          context,
          radius: opt.radius + opt.offset * i,
          offsetAngle: (i * opt.waveOffset * Math.PI) / 180,
        })
      )
    }
  }
  getCircles()

  return {
    render(updatedProps) {
      ;({ width, height, time } = updatedProps)

      widthHalf = width / 2
      heightHalf = height / 2

      startAngle += 1

      context.clearRect(0, 0, width, height)

      for (let i = 0; i < circles.length; i++) {
        circles[i].color = `hsl(${i * 5 + time * 10 + 110}, 50%, 50%)`
        circles[i].draw(widthHalf, heightHalf, startAngle)
      }
    },
  }
}

function Canvas() {
  useCanvas({ sketch: () => sketch })

  return ''
}
export default Canvas
