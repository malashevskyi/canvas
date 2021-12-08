import canvasSketch from 'canvas-sketch'
import gsap from 'gsap'
import { useEffect } from 'react'
import { useContext } from 'react/cjs/react.development'
import { GlobalContext } from '../../context/globalContext'
import useCanvas from '../../hooks/useCanvas'
import useNotification from '../../hooks/useNotification'
import { destroyObjects, resetCanvas } from '../../utiles'
import Smile from './Smile'

const sketch = ({ context, canvas, height, width }) => {
  const mouse = {
    x: width / 2,
    y: height / 2,
  }
  const eyePosition = { x: 0, y: 0 }
  const opt = {
    mouthRadius: 20,
  }
  const smiles = []

  canvas.addEventListener('mousemove', (event) => {
    mouse.x = event.x
    mouse.y = event.y
  })

  gsap.to(opt, {
    duration: 4,
    mouthRadius: 35,
    repeat: -1,
    yoyo: true,
    ease: 'bounce.inOut',
  })

  function getSmiles() {
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        smiles.push(
          new Smile({
            context,
            x: 210 * x + 100 + width / 2 - 315,
            y: 210 * y + 100 + height / 2 - 315,
          })
        )
      }
    }
  }
  getSmiles()

  return (updatedProps) => {
    ;({ width, height } = updatedProps)

    context.fillStyle = 'rgba(10, 10, 10, 1)'
    context.fillRect(0, 0, width, height)
    // context.translate(width / 4, height / 4);
    // context.scale(0.5, 0.5)

    eyePosition.x = Math.floor(mouse.x / (width / 18))
    eyePosition.y = Math.floor(mouse.y / (height / 18))

    smiles.forEach((smile) => {
      smile.draw(eyePosition, opt.mouthRadius)
    })
  }
}

function Canvas() {
  const [state, dispatch] = useContext(GlobalContext)

  useNotification({
    message: 'Move mouse to change eyes position',
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
