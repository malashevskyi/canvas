import canvasSketch from 'canvas-sketch'
import gsap from 'gsap'
import { useEffect } from 'react'
import { useContext } from 'react/cjs/react.development'
import { GlobalContext } from '../../context/globalContext'

import { destroyObjects, resetCanvas } from '../../utiles'
import Particle from './Particle'

const sketch = ({ context, height, width }) => {
  const particles = []
  const particlesTo = []
  const mouse = {
    x: 0,
    y: 0,
    radius: 0,
  }

  const square = {
    width: 50,
    height: 50,
  }

  function addParticle(x, y) {
    const theta = Math.atan2(square.height / 2 - y, square.width / 2 - x)
    const offset = (square.width * 7) / 2
    const radius = 300
    const conf = {
      // left top
      x: -radius,
      y: -radius,
    }

    if (theta >= Math.PI / 2 && theta <= Math.PI) {
      // right top
      conf.x = radius
      conf.y = -radius
    } else if (theta <= 0 && theta >= -Math.PI / 2) {
      // left bottom
      conf.x = -radius
      conf.y = radius
    } else if (theta < -Math.PI / 2 && theta >= -Math.PI) {
      // right bottom
      conf.x = radius
      conf.y = radius
    }

    particles.push(
      new Particle({
        context,
        ...conf,
      })
    )

    particlesTo.push(
      new Particle({
        context,
        x: x * 7 - offset,
        y: y * 7 - offset,
      })
    )
  }

  function animateParticles() {
    particles.forEach((particle, i) => {
      window['timelines'].push(
        gsap.to(particle, {
          duration: 5,
          ...particlesTo[i],
          side: 3,
          delay: 'random(0, 3.5)',
          yoyo: true,
          repeat: -1,
          repeatDelay: 1.5,
        })
      )
    })
  }

  function animateRadius() {
    window['timelines'].push(
      gsap.to(mouse, {
        duration: 1,
        radius: 300,
        delay: 5,
        repeatDelay: 12,
        ease: 'power4.in',
        repeat: -1,
      })
    )
  }

  function getParticles() {
    // reset particles
    particles.length = 0

    for (let y = 0; y < square.height; y++) {
      for (let x = 0; x < square.width; x++) {
        addParticle(x, y)
      }
    }
  }

  if (particles.length === 0) {
    getParticles()
    animateParticles()
    animateRadius()
  }

  return (updatedProps) => {
    ;({ width, height } = updatedProps)

    context.fillStyle = 'rgba(10, 10, 10, 0.3)'
    context.fillRect(0, 0, width, height)

    context.save()
    context.translate(width / 2, height / 2)
    particles.forEach((particle) => {
      particle.draw()
      particle.update(mouse)
    })
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
