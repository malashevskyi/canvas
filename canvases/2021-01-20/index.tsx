import useCanvas from '../../hooks/useCanvas'
import connectDots from './connectDots'
import Dot from './Dot'
import points from './points'

const sketch = ({ context, height, width }) => {
  const dots = []

  function getDots() {
    points.forEach((point) => {
      dots.push(new Dot(context, point[0], point[1]))
    })
  }

  function clearCanvas() {
    context.clearRect(0, 0, width, height)
    context.fillStyle = 'rgba(255, 255, 255, 1)'
    context.fillRect(0, 0, width, height)
  }

  function getHeart() {
    context.save()
    context.beginPath()
    connectDots(context, dots)
    context.fillStyle = 'rgba(255, 0, 0, 1)'
    context.fill()
    context.restore()
  }

  getDots()

  return (updatedProps) => {
    ;({ height, width } = updatedProps)

    clearCanvas()

    context.translate(width / 2, height / 2)

    getHeart()

    dots.forEach((dot) => {
      dot.update()
      // dot.draw();
    })
  }
}

function Canvas() {
  useCanvas({ sketch: () => sketch })

  return ''
}
export default Canvas
