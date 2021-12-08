import canvasSketch from 'canvas-sketch'
import { useEffect } from 'react'
import { useContext } from 'react/cjs/react.development'
import { GlobalContext } from '../../context/globalContext'
import { destroyObjects, resetCanvas } from '../../utiles'
import Circle from './Circle'
import Gun from './Gun'

const sketch = ({ context, canvas, width, height }) => {
  const guns = []
  const circles = []
  const cartridges = []
  const mouse = {
    x: width / 2,
    y: height / 2,
  }
  let tick = 0

  canvas.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
  })

  function getGuns() {
    guns.length = 0

    guns.push(
      new Gun({
        context,
        x: width / 2 - 300,
        y: height - 130,
        radius: 80,
      })
    )
    guns.push(
      new Gun({
        context,
        x: width / 2 + 300,
        y: height - 130,
        radius: 80,
      })
    )
  }
  getGuns()

  function getCircle() {
    circles.push(
      new Circle({
        context,
        cartridges,
        x: Math.random() * (width - 400) + 200,
        y: -40,
      })
    )
  }
  getCircle()

  return {
    render(updatedProps) {
      ;({ width, height } = updatedProps)

      tick += 1

      context.fillStyle = 'black'
      context.fillRect(0, 0, width, height)

      // add one circle every 160ms
      if (tick % 10 === 0) {
        getCircle()
      }

      guns.forEach((gun) => {
        gun.draw(mouse, tick)

        if (tick % 10 === 0) {
          cartridges.push(gun.getCartridge())
        }
      })

      circles.forEach((particle, i) => {
        if (particle.y - 50 > height || particle.radius === 0)
          circles.splice(i, 1)
        particle.update()
        particle.draw()
      })
      cartridges.forEach((cartridge, i) => {
        if (cartridge.y < -10) cartridges.splice(i, 1)
        cartridge.update(i)
        cartridge.draw()
      })
    },
    resize() {
      getGuns()
    },
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
