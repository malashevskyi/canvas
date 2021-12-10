import canvasSketch from 'canvas-sketch'
import { useContext, useEffect } from 'react/cjs/react.development'
import { GlobalContext } from '../../context/globalContext'
import useCanvas from '../../hooks/useCanvas'

import { destroyObjects, resetCanvas } from '../../utiles'
import Square from './Square'

const sketch = ({ context, height, width }) => {
  const points = []
  const maxSide = Math.max(width, height)

  function getSquares() {
    points.length = 0
    for (let y = 0; y < 80; y += 2) {
      for (let x = 0; x < 80; x += 2) {
        points.push(new Square(context, maxSide, [x, y]))
      }
    }
  }
  getSquares()

  return {
    render(updatedProps) {
      ;({ width, height } = updatedProps)

      context.fillStyle = 'rgb(20, 20, 20)'
      context.fillRect(0, 0, width, height)
      context.translate(width / 2 - 40, height / 2 - 40)

      for (let i = 0; i < points.length; i++) {
        points[i].render()
      }
    },
    resize() {
      getSquares()
    },
  }
}

function Canvas() {
  useCanvas({ sketch: () => sketch })

  return ''
}
export default Canvas
