import canvasSketch from 'canvas-sketch'
import gsap from 'gsap'
import { useEffect } from 'react'
import { useContext } from 'react/cjs/react.development'
import { GlobalContext } from '../../context/globalContext'

import useNotification from '../../hooks/useNotification'
import { destroyObjects, resetCanvas } from '../../utiles'
import Particle from './Particle'

const sketch = ({ context, canvas, height, width }) => {
  const particles = []
  const coordsCount = 200
  const angle = (Math.PI * 2) / coordsCount
  const circlesRadius = 100

  const mouse = {
    x: width / 2,
    y: height / 2,
  }

  canvas.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX
    mouse.y = event.clientY
  })

  function getParticles() {
    for (let i = 0; i < 40; i++) {
      const newParticle = new Particle({
        context,
        // random start tick from 0 to coordsCount for random start position on circle
        startTick: Math.floor(Math.random() * coordsCount),
        coordsCount,
        angle,
        circlesRadius,
        mouseStart: mouse,
        index: i,
      })

      particles.push(newParticle)

      window['timelines'].push(
        gsap.to(newParticle, {
          duration: 4,
          radius: 7,
          repeat: -1,
          yoyo: true,
          delay: Math.random() * 3,
          ease: 'power2.inOut',
        })
      )
    }
  }
  getParticles()

  return (updatedProps) => {
    ;({ width, height } = updatedProps)

    context.fillStyle = 'rgba(10, 10, 10, 1)'
    context.fillRect(0, 0, width, height)

    particles.forEach((particle) => {
      particle.update(mouse)
    })
  }
}

function Canvas() {
  const [state, dispatch] = useContext(GlobalContext)

  useNotification({
    message: 'Move mouse to interact with particles',
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
