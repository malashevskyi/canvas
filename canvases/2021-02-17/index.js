import canvasSketch from 'canvas-sketch'
import { useEffect } from 'react'
import { useContext } from 'react/cjs/react.development'
import { GlobalContext } from '../../context/globalContext'
import useCanvas from '../../hooks/useCanvas'
import { destroyObjects, resetCanvas } from '../../utiles'
import imageData from './imageData'
import Particle from './Particle'

const sketch = ({ context, height, width }) => {
  const particles = []
  const image = {
    width: 80,
    height: 80,
  }

  function addParticle(x, y, i) {
    const theta = Math.atan2(image.height / 2 - y, image.width / 2 - x)
    const radius = 70

    let xTo = x * 2
    let yTo = y * 2

    if (Math.cos(theta) <= 0 && Math.sin(theta) >= 0) {
      // right top part
      xTo += radius
      yTo += -radius
    } else if (Math.cos(theta) <= 0 && Math.sin(theta) < 0) {
      // right bottom part
      yTo += radius
      xTo += radius
    } else if (Math.cos(theta) > 0 && Math.sin(theta) < 0) {
      // left bottom part
      xTo += -radius
      yTo += radius
    } else {
      // left top part
      xTo += -radius
      yTo += -radius
    }

    particles.push(
      new Particle({
        context,
        x: x * 2,
        y: y * 2,
        xTo,
        yTo,
        index: i,
        color: `rgba(${imageData[i]}, ${imageData[i + 1]}, ${
          imageData[i + 2]
        }, ${imageData[i + 3]})`,
      })
    )
  }

  function getParticles() {
    let i = 0
    for (let y = 0; y < image.height; y++) {
      for (let x = 0; x < image.width; x++) {
        if (
          imageData[i + 3] > 100 &&
          (imageData[i] < 255 ||
            imageData[i + 1] < 255 ||
            imageData[i + 2] < 255)
        ) {
          addParticle(x, y, i)
        }
        i += 4
      }
    }
  }
  getParticles()

  return (updatedProps) => {
    ;({ width, height } = updatedProps)

    context.clearRect(0, 0, width, height)
    context.translate(width / 2 - image.width, height / 2 - image.height)

    particles.forEach((particle, i) => {
      particle.draw()
    })
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
