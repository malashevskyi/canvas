import { useEffect } from 'react'

import gsap from 'gsap'
import useCanvas from '../../hooks/useCanvas'
import imageData from './imageData'
import Particle from './Particle'
import ParticleScale from './ParticleScale'

const tls = []
const particles = []
let particles2 = []
let timeout

const sketch = () => (initialProps) => {
  const { context } = initialProps
  let { width, height } = initialProps

  const offset = [0]
  let alpha = 0.2
  let tick = 0
  let textOffsetAnimate = false

  let scaleParticle
  let logoAnimationFinished = false

  const mouse = {
    x: 0,
    y: 20,
    radius: 30,
  }

  function init() {
    particles.length = 0
    const radius = Math.sqrt(width * width + height * height)

    for (let i = 0; i < imageData.length; i++) {
      const [x, y] = imageData[i]
      particles.push(
        new Particle({
          context,
          x: Math.cos(i) * radius + 250,
          y: Math.sin(i) * radius + 35,
          xTo: x,
          yTo: y,
          index: i,
        })
      )
    }

    const part = Math.floor(particles.length / 2)
    particles2 = particles.splice(part)

    scaleParticle = new ParticleScale({ context })
  }
  init()

  function restart() {
    // reset gsap particles animation
    tls.forEach((tl) => {
      tl.kill()
    })
    tls.length = 0
    // reset top part of particles
    particles.length = 0
    // reset bottom part of particles
    particles2.length = 0
    // reset tick
    tick = 0
    // reset alpha to see particles trail
    alpha = 0.2

    // reset mouse (for firework)
    mouse.x = 0
    mouse.y = 20

    logoAnimationFinished = false

    init()
  }

  function firework() {
    mouse.x += mouse.x === 0 ? 10 : 37
    mouse.y = 20

    if (mouse.x < 400) {
      setTimeout(firework, 200)
    }
  }

  function animateScale(delay) {
    const radius = Math.sqrt(width * width + height * height) / 2
    const tl = gsap.timeline({
      defaults: {
        duration: 0.7,
        delay,
        repeat: 3,
        yoyo: true,
      },
      onComplete: () => {
        gsap.to(scaleParticle, { duration: 4, ease: 'power2.out', radius })
        timeout = setTimeout(restart, 4000)
      },
    })
    tl.fromTo(scaleParticle, { radius: 0 }, { radius: 50 })
  }

  function gsapAnimateParticles(p) {
    p.forEach((particle, i) => {
      const last = i === p.length / 2 - 2
      tls.push(
        gsap.to(particle, {
          duration: 3.5,
          x: particle.xTo,
          y: particle.yTo,
          alpha: 1,
          delay: last ? '3' : 'random(0, 3)',
        })
      )
    })
  }

  // Draw all particles
  function drawParticles(p) {
    for (let i = 0; i < p.length; i++) {
      const particle = p[i]

      if (particle.radius < 0.2) {
        p.splice(i, 1)
      }
      particle.update(mouse, logoAnimationFinished)
      particle.draw()
    }
  }

  return {
    render(updatedProps) {
      ;({ width, height } = updatedProps)
      if (tls.length === 0) {
        gsapAnimateParticles(particles)
        gsapAnimateParticles(particles2)
      }

      context.fillStyle = `rgba(10, 10, 10, ${alpha})`
      context.fillRect(0, 0, width, height)

      // center point
      // context.save();
      // context.translate(width / 2, height / 2);
      // context.fillStyle = `rgba(200, 10, 10, ${alpha})`;
      // context.fillRect(0, 0, 10, 10);
      // context.restore();

      // translate center minus image width and image height
      context.translate(width / 2 - 150, height / 2 - 15)

      tick += 1
      // remove particles trail
      if (tick > 400) {
        alpha += 0.01
      }

      // breakpoint: start to shift logo parts and timeout firework
      if (tick === 345) {
        textOffsetAnimate = true
        gsap.to(offset, {
          duration: 0.7,
          0: 50,
          repeat: 1,
          yoyo: true,
          ease: 'power3.out',
        })

        // start firework
        timeout = setTimeout(() => {
          logoAnimationFinished = true
          firework()
        }, 1400)

        // animate radius of center circle (from 0 to screen radius)
        // with delay in 3 seconds
        animateScale(3)
      }

      if (textOffsetAnimate) {
        // animate shifting of logo parts
        context.save()
        // translate before drawing
        context.translate(offset, 0)
        drawParticles(particles2)
        context.restore()

        context.save()
        // translate before drawing
        context.translate(-offset, 0)
        drawParticles(particles)
        context.restore()
      } else {
        // animate without shifting
        drawParticles(particles2)
        drawParticles(particles)
      }

      context.save()
      context.translate(65, 0)
      scaleParticle.draw()
      context.restore()
    },
    resize() {},
  }
}

function Canvas() {
  useCanvas({ sketch: () => sketch() })

  useEffect(() => {
    clearTimeout(timeout)

    return () => {
      tls.forEach((tl) => {
        tl.kill()
      })
      tls.length = 0
    }
  })

  return ''
}

export default Canvas
