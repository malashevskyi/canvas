import canvasSketch from 'canvas-sketch'
import random from 'canvas-sketch-util/random'
import palettes from 'nice-color-palettes'
import { useEffect } from 'react'
import { useContext } from 'react/cjs/react.development'
import { GlobalContext } from '../../context/globalContext'

import { destroyObjects, resetCanvas } from '../../utiles'
import Numb from './Numb'

const sketch = ({ context, height, width }) => {
  random.setSeed(1)

  const palette = random.pick(palettes)
  const numbs = []
  let tick = 0

  function addNumber() {
    if (numbs.length < 50 && tick % 10 === 0) {
      numbs.push(new Numb(context, palette))
    }
  }

  return (updatedProps) => {
    ;({ width, height } = updatedProps)
    tick += 1

    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)

    addNumber()

    context.save()
    context.translate(width / 2, height - 50)
    for (let i = 0; i < numbs.length; i++) {
      const numb = numbs[i]
      if (numb.tick > 300) {
        numb.initial()
      }
      numb.render()
    }
    context.restore()
  }
}

function Canvas() {
  const [state, dispatch] = useContext(GlobalContext)

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
