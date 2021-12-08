import canvasSketch from 'canvas-sketch'
import random from 'canvas-sketch-util/random'
import gsap from 'gsap'
import { useContext, useEffect } from 'react/cjs/react.development'
import { GlobalContext } from '../../context/globalContext'
import useCanvas from '../../hooks/useCanvas'
import { destroyObjects, resetCanvas } from '../../utiles'
import Particle from './Particle'

const sketch = ({ context, height, width }) => {
  random.setSeed(4)

  const particles = []

  const mouse = {
    x: 0,
    y: 0,
    radius: 50,
  }

  gsap.to(mouse, {
    duration: 2,
    radius: 390,
    repeat: -1,
    repeatDelay: 0,
    yoyo: true,
    ease: 'power1.inOut',
  })

  function getParticles() {
    particles.length = 0
    for (let i = 0; i < 1000; i++) {
      const [x, y] = random.insideCircle(400)
      particles.push(new Particle({ context, x, y }))
    }
  }
  getParticles()

  return (updatedProps) => {
    ;({ width, height } = updatedProps)

    context.clearRect(0, 0, width, height)
    context.translate(width / 2, height / 2)

    particles.forEach((particle) => {
      particle.update(mouse)
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
