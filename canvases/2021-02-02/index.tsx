import useCanvas from '../../hooks/useCanvas'
import Circle from './Circle'

const sketch = ({ context, height, width }) => {
  let startAngle = 0

  const opt = {
    count: 15,
    offset: 4,
    radius: 140,
    waveOffset: 30,
  }
  const circles = []

  function getCircles() {
    for (let i = opt.count; i > 0; i--) {
      circles.push(
        new Circle({
          context,
          radius: opt.radius + opt.offset * i,
          offsetAngle: (i * opt.waveOffset * Math.PI) / 180,
          index: i,
        })
      )
    }
  }
  getCircles()

  return {
    render(updatedProps) {
      ;({ height, width } = updatedProps)

      startAngle += 1

      context.clearRect(0, 0, width, height)

      circles.forEach((circle) => {
        // circle.color = `hsl(${(i * 5 + time * 10) % 250 + 110}, 50%, 50%)`
        circle.draw(startAngle, width, height)
      })
    },
  }
}

function Canvas() {
  useCanvas({ sketch: () => sketch })

  return ''
}
export default Canvas
