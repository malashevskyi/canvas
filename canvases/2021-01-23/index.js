import canvasSketch from 'canvas-sketch'
import { useContext, useEffect } from 'react/cjs/react.development'
import { GlobalContext } from '../../context/globalContext'
import useCanvas from '../../hooks/useCanvas'
import useNotification from '../../hooks/useNotification'
import { destroyObjects, resetCanvas } from '../../utiles'

const sketch = ({ context, canvas, height, width }) => {
  const motionTrailLength = 20
  let xPos = width / 2
  let yPos = height / 2
  const circles = []

  class DrawCircle {
    constructor(x, y) {
      this.x = x
      this.y = y
    }

    draw(a) {
      let radius = 50

      if (a !== 1) {
        radius = 220 * (a / 4)
      }

      context.beginPath()
      context.arc(this.x, this.y, radius, 0, 2 * Math.PI, true)
      context.fillStyle = 'rgba(254, 231, 21, ' + a + ')'
      context.fill()
    }
  }

  function mouseMoveHandler(e) {
    xPos = e.offsetX
    yPos = e.offsetY
  }

  function touchMoveHandler(e) {
    e.preventDefault()
    xPos = e.changedTouches[0].clientX
    yPos = e.changedTouches[0].clientY
  }

  function addCircle() {
    const lastCircle = new DrawCircle(xPos, yPos)
    circles.push(lastCircle)
    lastCircle.draw(1)
  }

  function removeFirstCircle() {
    if (circles.length > motionTrailLength) circles.shift()
  }

  function drawCircles() {
    circles.forEach((circle, i) => {
      const alpha = (i + 1) / circles.length
      circle.draw(alpha)
    })
  }

  function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.fillStyle = '#101820FF'
    context.fillRect(0, 0, width, height)
  }

  canvas.addEventListener('mousemove', mouseMoveHandler)
  canvas.addEventListener('touchmove', touchMoveHandler)

  return (updatedProps) => {
    ;({ height, width } = updatedProps)

    clearCanvas()

    drawCircles()

    addCircle()
    removeFirstCircle()
  }
}

function Canvas() {
  const [state, dispatch] = useContext(GlobalContext)

  useNotification({
    message: 'Move mouse to change position',
  })

  useEffect(() => {
    resetCanvas()

    if (!state.canvas2D) return

    const settings = {
      canvas: state.canvas2D,
      animate: true,
    }

    let manager
    ;(async () => {
      state.manager.unload()

      manager = await canvasSketch(sketch, settings)

      dispatch({ ...state, manager })
    })()

    return () => {
      destroyObjects(manager)
    }
  }, [state.canvas2D])

  return ''
}
export default Canvas
