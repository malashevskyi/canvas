import canvasSketch from 'canvas-sketch'
import gsap from 'gsap'
import { useEffect } from 'react'
import { useContext } from 'react/cjs/react.development'
import { GlobalContext } from '../../context/globalContext'
import useCanvas from '../../hooks/useCanvas'
import useNotification from '../../hooks/useNotification'
import { destroyObjects, resetCanvas } from '../../utiles'
import imageData from './imageData'
import Particle from './Particle'

const sketch = ({ context, canvas, height, width }) => {
  const particles = []
  const particlesTo = []

  const mouse = {
    x: 10000,
    y: 10000,
    radius: 70,
  }
  let tick = 0
  let alpha = 0.2

  canvas.addEventListener('mousemove', (event) => {
    if (tick > 150) {
      mouse.x = event.x - width / 2
      mouse.y = event.y - height / 2
    }
  })

  const image = {
    width: 170,
    height: 30,
  }

  function addParticle(x, y, i) {
    const screenRadius = Math.sqrt(width * width + height * height) / 2

    // set circle x and circle y with screen radius
    particles.push(
      new Particle({
        context,
        x: Math.cos(i) * screenRadius,
        y: Math.sin(i) * screenRadius,
      })
    )

    const textOffsetX = 300
    const textOffsetY = 55
    // multiply every coordinate by 3, 2px length + offset 1px
    particlesTo.push(
      new Particle({
        context,
        x: x * 3 - textOffsetX,
        y: y * 3 - textOffsetY,
      })
    )
  }

  function getParticles() {
    // reset particles
    particles.length = 0

    let i = 0
    for (let y = 0; y < image.height; y++) {
      for (let x = 0; x < image.width; x++) {
        // check r value of rgba
        if (imageData[i] < 100) addParticle(x, y, i)
        i += 4
      }
    }
  }

  function animateParticles() {
    particles.forEach((particle, i) => {
      window['timelines'].push(
        gsap.to(particle, {
          duration: 5,
          ...particlesTo[i],
          delay: 'random(0, 3.5)',
        })
      )
    })
  }

  function drawMouseCircle() {
    context.beginPath()
    context.fillStyle = 'rgba(255, 255, 255, 0.03)'
    context.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2)
    context.fill()
    context.restore()
  }

  if (particles.length === 0) {
    getParticles()
    animateParticles()
  }

  return (updatedProps) => {
    ;({ width, height } = updatedProps)

    tick += 1

    context.fillStyle = `rgba(10, 10, 10, ${alpha})`
    context.fillRect(0, 0, width, height)

    if (tick > 250) {
      alpha += 0.01
    }

    context.save()
    context.translate(width / 2, height / 2)
    particles.forEach((particle) => {
      particle.draw()
      particle.update(mouse)
    })

    drawMouseCircle()
  }
}

function Canvas() {
  const [state, dispatch] = useContext(GlobalContext)

  useNotification({
    message: 'Move mouse to push particles',
    delay: 5000,
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
