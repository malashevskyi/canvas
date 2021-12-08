import canvasSketch from 'canvas-sketch'
import random from 'canvas-sketch-util/random'
import gsap from 'gsap'
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
    width: 96,
    height: 96,
    data: imageData,
  }

  function addParticle(x, y, i) {
    particles.push(
      new Particle({
        context,
        x: x * 2,
        y: y * 2,
        color: `rgba(${image.data[i]}, ${image.data[i + 1]}, ${
          image.data[i + 2]
        }, ${image.data[i + 3]})`,
      })
    )
  }

  function getParticles() {
    // reset particles
    particles.length = 0

    let i = 0
    for (let y = 0; y < image.height; y++) {
      for (let x = 0; x < image.width; x++) {
        if (image.data[i + 3] > 1) addParticle(x, y, i)
        i += 4
      }
    }
  }

  function animateParticles() {
    particles.forEach((particle, i) => {
      const delay = Math.floor(i * (Math.random() * 5)) / 20
      window['timelines'].push(
        gsap.to(particle, {
          duration: 5,
          x: random.rangeFloor(400, 900),
          y: 500,
          ease: 'power4.in',
          delay,
        })
      )
      window['timelines'].push(
        gsap.to(particle, {
          duration: 1,
          alpha: 0,
          delay: delay + 3.5,
          ease: 'linear',
        })
      )
    })
  }

  if (particles.length === 0) {
    getParticles()
    animateParticles()
  }

  return (updatedProps) => {
    ;({ width, height } = updatedProps)

    if (image.width && image.height) {
      context.translate(
        width / 2 - (image.width / 2) * 3,
        height / 2 - (image.height / 2) * 3
      )
      context.fillStyle = 'white'
      context.fillRect(0, 0, 700, 500)
    }

    particles.forEach((particle, i) => {
      if (particle.y >= 700) {
        particles.splice(i, 1)
      }
      particle.draw()
    })
  }
}

function Canvas() {
  const [state, dispatch] = useContext(GlobalContext)

  useEffect(() => {
    resetCanvas()

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
  }, [])

  return ''
}

export default Canvas
