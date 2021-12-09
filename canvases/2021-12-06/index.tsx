import useCanvas from '../../hooks/useCanvas'

const roundRect = (
  context,
  x,
  y,
  width,
  height,
  radius = 5,
  fill,
  stroke = true
) => {
  context.save()
  context.beginPath()
  context.moveTo(x + radius, y)
  context.lineTo(x + width - radius, y)
  context.quadraticCurveTo(x + width, y, x + width, y + radius)
  context.lineTo(x + width, y + height - radius)
  context.quadraticCurveTo(
    x + width,
    y + height,
    x + width - radius,
    y + height
  )
  context.lineTo(x + radius, y + height)
  context.quadraticCurveTo(x, y + height, x, y + height - radius)
  context.lineTo(x, y + radius)
  context.quadraticCurveTo(x, y, x + radius, y)
  context.closePath()
  if (fill) {
    context.fill()
  }
  if (stroke) {
    context.stroke()
  }
  context.restore()
}

const color = '#0367A6'

const sketch = ({ context, width, height }) => {
  let tick = 0
  return {
    render(updatedProps) {
      ;({ width, height } = updatedProps)
      // console.log('tick')
      tick++

      context.beginPath()
      context.fillStyle = '#ffffff'
      context.fillRect(0, 0, width, height)

      context.save()
      context.translate(width / 2, height / 2)

      // main circle
      context.beginPath()
      context.arc(0, 0, 250, 0, Math.PI * 2)
      context.lineWidth = '7'
      context.strokeStyle = color
      context.stroke()
      context.restore()

      // big points
      for (let i = 0; i < 12; i++) {
        context.save()
        context.translate(width / 2, height / 2)
        context.rotate(((Math.PI * 2) / 12) * i)
        context.fillStyle = color
        roundRect(context, 210, -3, 30, 7, 3, true, false)
        context.restore()
      }
      // small points
      for (let i = 0; i < 60; i++) {
        context.save()
        context.translate(width / 2, height / 2)
        context.rotate(((Math.PI * 2) / 60) * i)
        context.fillStyle = color
        roundRect(context, 215, 0, 20, 1, 0, true, false)
        context.restore()
      }

      const date = new Date()

      const minutesAngle = ((Math.PI * 2) / 60) * date.getMinutes()
      const hoursAngle = ((Math.PI * 2) / 12) * date.getHours()
      const secondsAngle = ((Math.PI * 2) / 60) * date.getSeconds()

      // hour arrow
      context.save()
      context.translate(width / 2, height / 2)
      context.rotate(-Math.PI / 2 + hoursAngle + minutesAngle / 12)
      context.fillStyle = color
      roundRect(context, -30, -5, 130, 10, 3, true, false)
      context.restore()

      // minutes arrow
      context.save()
      context.translate(width / 2, height / 2)
      context.rotate(-Math.PI / 2 + minutesAngle + secondsAngle / 60)
      context.fillStyle = color
      roundRect(context, -30, -3, 230, 6, 3, true, false)
      context.restore()

      // seconds arrow
      context.save()
      context.translate(width / 2, height / 2)
      context.rotate(-Math.PI / 2 + secondsAngle)
      context.fillStyle = color
      roundRect(context, -70, -2, 270, 4, 2, true, false)
      context.restore()

      // big center circle
      context.save()
      context.translate(width / 2, height / 2)
      context.beginPath()
      context.arc(0, 0, 15, 0, Math.PI * 2)
      context.fillStyle = color
      context.fill()
      context.restore()

      // small center circle
      context.save()
      context.translate(width / 2, height / 2)
      context.beginPath()
      context.arc(0, 0, 5, 0, Math.PI * 2)
      context.fillStyle = 'white'
      context.fill()
      context.restore()
    },
    resize() {},
  }
}
function Canvas() {
  useCanvas({ sketch: () => sketch })

  return ''
}
export default Canvas
