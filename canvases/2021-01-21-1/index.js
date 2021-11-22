import gsap from 'gsap'
import { useEffect } from 'react'
import random from 'canvas-sketch-util/random'

import heartPoints from './heartPoints'
import trianglesPoints from './trianglesPoints'
import Dot from './Dot'
import Triangle from './Triangle'
import connectDots from './connectDots'
import useCanvas from '../../hooks/useCanvas'
import { resetCanvas } from '../../utiles'

const tls = []

const sketch = () => (initialProps) => {
  const { context } = initialProps
  let { height, width } = initialProps

  const angle = (Math.PI * 2) / trianglesPoints.length
  const radius = Math.max(width, height)
  const triangles = []
  const heartAlpha = { value: 0 }
  const dots = []

  function generateTriangles() {
    // reset
    triangles.length = 0

    trianglesPoints.forEach((array, i) => {
      const radiusM = radius + radius * 0.2 * Math.random()
      const rotateAngle = 70

      triangles.push(
        new Triangle({
          context,
          position: array,
          yFrom: Math.sin(angle * (i + rotateAngle)) * radiusM,
          xFrom: Math.cos(angle * (i + rotateAngle)) * radiusM,
          last: i === trianglesPoints.length - 1,
        })
      )
    })
  }
  if (triangles.length === 0) {
    generateTriangles()

    triangles.forEach((triangle) => {
      tls.push(
        gsap.from(triangle, {
          duration: 3,
          x1: triangle.xFrom,
          x2: triangle.xFrom,
          x3: triangle.xFrom,
          y1: triangle.yFrom,
          y2: triangle.yFrom,
          y3: triangle.yFrom,
          delay: random.range(0, 3.5),
        })
      )
    })
  }

  function getDots() {
    // dots for the second heart
    heartPoints.forEach((point) => {
      dots.push(new Dot(context, point[0], point[1]))
    })
  }

  function getHeart() {
    // the second heart
    const { value: alpha } = heartAlpha
    context.save()
    context.translate(width / 2, height / 2)
    context.beginPath()
    connectDots(context, dots)
    context.fillStyle = `rgba(255, 0, 0, ${alpha})`
    context.fill()

    dots.forEach((dot) => {
      dot.render()
      // dot.draw();
    })
    context.restore()

    tls.push(
      gsap.to(heartAlpha, {
        duration: 1,
        delay: 6.3,
        value: 1,
      })
    )
  }

  function getTriangles() {
    // the first heart
    context.save()
    context.translate(width / 2 - 283, height / 2 - 274)
    triangles.forEach((triangle) => {
      triangle.draw()
      // triangle.tl.play();
    })
    context.restore()
  }

  getDots()

  return (updatedProps) => {
    ;({ width, height } = updatedProps)

    context.fillStyle = 'black'
    context.fillRect(0, 0, width, height)

    context.clearRect(0, 0, width, height)

    // get the first heart
    getTriangles()
    // get the second heart
    getHeart()
  }
}

function Canvas() {
  useCanvas({ sketch: () => sketch() })

  useEffect(() => {
    resetCanvas()

    tls.forEach((tl) => {
      tl.restart(true, false)
    })

    return () => {
      tls.forEach((tl) => {
        tl.pause()
      })
    }
  })

  return ''
}

export default Canvas
