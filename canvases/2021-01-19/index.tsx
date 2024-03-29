import useCanvas from '../../hooks/useCanvas'
import useNotification from '../../hooks/useNotification'
import Circle from './Circle'

const sketch = ({ context, canvas, height, width }) => {
  const opt = {
    radius: 40,
    trailLength: 15,
  }
  let xPos = width / 2
  let yPos = height / 2
  let circles = Array(opt.trailLength).fill('')

  function storeLastPosition(x, y) {
    circles.unshift(new Circle(context, x, y, opt.radius))
    circles.pop()
  }

  function styleRect() {
    context.clearRect(0, 0, width, height)
    context.fillStyle = `hsl(${250}, 50%, 50%)`
    context.fillRect(0, 0, width, height)
  }

  function mouseMoveHandler(e) {
    xPos = (height / canvas.offsetHeight) * e.offsetX
    yPos = (width / canvas.offsetWidth) * e.offsetY
  }
  function touchMoveHandler(e) {
    e.preventDefault()
    xPos = e.changedTouches[0].clientX
    yPos = e.changedTouches[0].clientY
  }
  canvas.addEventListener('mousemove', mouseMoveHandler)
  canvas.addEventListener('touchmove', touchMoveHandler)

  return (updatedProps) => {
    ;({ height, width } = updatedProps)
    styleRect()
    circles.forEach((circle, i) => {
      const radius = (i + 1) / circles.length
      circle.draw?.(radius, `hsl(${250 + 5 * i}, 50%, 50%)`)
    })
    storeLastPosition(xPos, yPos)
  }
}

function Canvas() {
  useNotification({
    message: 'Move mouse to change position',
  })

  useCanvas({ sketch: () => sketch })

  return ''
}
export default Canvas
