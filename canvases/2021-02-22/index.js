import canvasSketch from 'canvas-sketch'
import gsap from 'gsap'
import { useEffect } from 'react'
import { useContext } from 'react/cjs/react.development'
import { GlobalContext } from '../../context/globalContext'
import useCanvas from '../../hooks/useCanvas'
import { destroyObjects, resetCanvas } from '../../utiles'

const sketch = ({ context, height, width }) => {
  const count = 20
  const ys = Array(count).fill(0)
  const rot = Array(count).fill(0)
  const alpha = Array(count).fill(0)
  let tick = 0

  for (let i = 0; i < count; i++) {
    // move from bottom and top to center
    window['timelines'].push(
      gsap.from(ys, {
        duration: 2,
        delay: i / 2,
        [i]: i % 2 === 0 ? -height / 2 : height / 2,
        ease: 'power3.out',
      })
    )

    // rotate
    window['timelines'].push(
      gsap.to(rot, {
        duration: 2,
        delay: i / 2 + 12,
        [i]: Math.PI,
        repeat: -1,
        repeatDelay: 9,
        yoyo: true,
        ease: 'elastic.out',
      })
    )

    // animate opacity
    window['timelines'].push(
      gsap.to(alpha, {
        duration: 2,
        delay: i / 2 + 0.5,
        [i]: 1,
        ease: 'power3.out',
      })
    )
  }

  function drawRect(i) {
    context.save()
    context.beginPath()
    context.globalAlpha = alpha[i]
    context.fillStyle = `hsl(${tick / 5 + i * 10}, 50%, 50%)`
    context.translate(i * 43, ys[i])
    context.rotate(rot[rot.length - 1 - i])
    context.moveTo(0, 0)
    context.lineTo(40, 0)
    context.lineTo(40, -250)
    context.lineTo(0, -250)
    context.fill()
    context.closePath()
    context.restore()
  }

  return (updatedProps) => {
    ;({ width, height } = updatedProps)

    tick += 1

    context.clearRect(0, 0, width, height)
    context.translate(width / 2 - (43 * 20) / 2, height / 2 + 125)

    context.beginPath()

    for (let i = 0; i < count; i++) {
      drawRect(i)
    }

    context.closePath()
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
