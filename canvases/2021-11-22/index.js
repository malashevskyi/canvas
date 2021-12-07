import canvasSketch from 'canvas-sketch'
import gsap from 'gsap'
import { useEffect } from 'react'
import { useContext } from 'react/cjs/react.development'
import { GlobalContext } from '../../context/globalContext'
import { destroyObjects, resetCanvas } from '../../utiles'

const sketch = ({ context, width, height }) => {
  const radius = 350
  const count = 3
  const angle = (Math.PI * 2) / count
  const depths = []
  let depth = 0
  let config = {
    limit: 2,
    a: 2.7,
    b: 2.7,
    c: 2.7,
  }

  let tick = 0
  const initialPoints = []

  function getInitialPoints() {
    // reset
    initialPoints.length = 0

    for (let i = 1; i <= 3; i++) {
      initialPoints.push({
        x: Math.cos(angle * i) * radius,
        y: Math.sin(angle * i) * radius,
      })
    }
  }

  getInitialPoints()

  function gsapAnimate() {
    const gsapConf = { yoyo: true, duration: 0.6, repeat: -1 }
    const tl = gsap.timeline({ ...gsapConf })
    tl.to(config, { limit: 7, ...gsapConf })
    tl.to(config, { a: 3, delay: 0.2, repeatDelay: 0.2, ...gsapConf })
    tl.to(config, { b: 3, delay: 0.4, repeatDelay: 0.2, ...gsapConf })
    tl.to(config, { c: 3, delay: 0.6, repeatDelay: 0.2, ...gsapConf })

    window['timelines'].push(tl)
  }

  function drawTriangle(p0, p1, p2, color) {
    context.beginPath()
    context.moveTo(p0.x, p0.y)
    context.lineTo(p1.x, p1.y)
    context.lineTo(p2.x, p2.y)
    context.fillStyle = color
    context.fill()
  }

  function sierpinski(p0, p1, p2, limit, setDepth) {
    if (limit > 0) {
      depth++
      const r = 10
      const offsetX = Math.cos(tick) * r
      const offsetY = Math.sin(tick) * r
      const pA = {
        x: (p0.x + p1.x + offsetX) / config.a,
        y: (p0.y + p1.y - offsetY) / config.a,
      }
      const pB = {
        x: (p1.x + p2.x + offsetX) / config.b,
        y: (p1.y + p2.y - offsetY) / config.b,
      }
      const pC = {
        x: (p2.x + p0.x + offsetX) / config.c,
        y: (p2.y + p0.y - offsetY) / config.c,
      }

      sierpinski(p0, pA, pC, limit - 1, setDepth)
      sierpinski(pA, p1, pB, limit - 1, setDepth)
      sierpinski(pC, pB, p2, limit - 1, setDepth)
    } else {
      // set depth during the first animation
      if (setDepth) depths.push(depth)

      // get color before increasing depth (start from 0)
      const color = getColor()

      depth += 0.5

      drawTriangle(p0, p1, p2, color)
    }
  }

  function getColor() {
    return `hsl(${depths[depth] + tick}, 50%, 50%)`
  }

  return {
    render(updatedProps) {
      ;({ width, height } = updatedProps)

      context.beginPath()
      context.fillStyle = '#ffffff'
      context.fillRect(0, 0, width, height)

      if (tick === 10) gsapAnimate()

      tick += 0.5

      context.save()
      context.translate(width / 2, height / 2)

      // reset depth for color control
      depth = 0

      if (depths.length) {
        sierpinski(...initialPoints, 4, false)
      } else {
        // generate depths
        sierpinski(...initialPoints, 4, true)
      }

      context.restore()
    },
    resize() {},
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
