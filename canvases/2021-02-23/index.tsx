import useCanvas from '../../hooks/useCanvas'

const sketch = ({ context, canvas, height, width }) => {
  const mouse = { x: 0, y: 0 }
  const opt = { scale: 1, rotate: 0 }
  let tick = 0

  canvas.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
  })

  // set angle circle / 20;
  const rot = Array(20)
    .fill('')
    .map((u, i) => (Math.PI / 10) * i)

  function drawShape(i) {
    context.save()
    context.beginPath()
    context.rotate(rot[i])
    context.fillStyle = `hsl(${tick + 10 * i}, 50%, 50%)`
    context.moveTo(-20, 126)
    context.lineTo(20, 126)
    context.lineTo(-20, -126)
    context.lineTo(20, -126)
    context.fill()
    context.closePath()
    context.restore()
  }

  function drawCircle(path) {
    context.beginPath()
    context.strokeStyle = `hsl(${tick + 150}, 50%, 50%)`
    path.arc(0, 0, 128, 0, Math.PI * 2)
    context.lineWidth = 5
    context.stroke(path)
    context.closePath()
  }

  return (updatedProps) => {
    ;({ width, height } = updatedProps)

    tick += 0.5

    context.clearRect(0, 0, width, height)
    context.translate(width / 2, height / 2)
    context.rotate(opt.rotate)
    context.scale(opt.scale, opt.scale)

    rot.forEach((e, i) => drawShape(i))

    const path = new Path2D()
    drawCircle(path)

    // if mouse hover circle
    if (context.isPointInPath(path, mouse.x, mouse.y)) {
      if (opt.scale < 2) {
        opt.rotate += 0.05
        opt.scale += 0.01
      } else {
        opt.rotate += 0.01
      }

      canvas.style.cursor = 'pointer'
    } else {
      canvas.style.cursor = 'auto'
      if (opt.scale > 1.05) {
        opt.rotate += 0.05
        opt.scale -= 0.05
      }
    }
  }
}

function Canvas() {
  useCanvas({ sketch: () => sketch })

  return ''
}
export default Canvas
