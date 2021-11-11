import { useEffect } from 'react'
import gsap from 'gsap'
const path = require('path')
const glslify = require('glslify')

import useCanvas from '../../hooks/useCanvas'
const fragmentShaderSource = glslify(
  path.resolve(__dirname, './shaders/fs.frag')
)
const vertexShaderSource = glslify(path.resolve(__dirname, './shaders/vs.vert'))

const tls = []

// import fragmentShaderSource from './shaders/fs.frag'
// import vertexShaderSource from './shaders/vs.vert'

const sketch = () => (initialProps) => {
  const { context: gl } = initialProps
  let { width, height } = initialProps
  console.log('context', gl)
  // https://developer.mozilla.org/en-US/docs/Web/API/OES_standard_derivatives
  gl.getExtension('OES_standard_derivatives')
  gl.getExtension('EXT_shader_texture_lod')

  const vertexShader = gl.createShader(gl.VERTEX_SHADER)
  gl.shaderSource(vertexShader, vertexShaderSource)
  gl.compileShader(vertexShader)

  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
  gl.shaderSource(fragmentShader, fragmentShaderSource)
  gl.compileShader(fragmentShader)

  const program = gl.createProgram()
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)

  const linkProgramSuccess = gl.getProgramParameter(program, gl.LINK_STATUS)
  console.log(linkProgramSuccess)

  const fsSuccess = gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)
  const vsSuccess = gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)
  console.log(fsSuccess)
  console.log(vsSuccess)

  const positionAttribLocation = gl.getAttribLocation(program, 'a_position')
  const positionBuffer = gl.createBuffer()

  // requestAnimationFrame(animate);

  const mouse = [0, 0]

  window.addEventListener('mousemove', (event) => {
    mouse[0] = event.clientX
    mouse[1] = event.clientY
  })

  return (updatedProps) => {
    ;({ width, height } = updatedProps)
    // const now = updatedProps.time
    const now = 2

    gl.useProgram(program)

    gl.uniform1f(gl.getUniformLocation(program, 'u_width'), 3000)
    gl.uniform1f(gl.getUniformLocation(program, 'u_height'), gl.canvas.height)
    gl.uniform2fv(gl.getUniformLocation(program, 'u_resolution'), [
      gl.canvas.width,
      gl.canvas.height,
    ])
    gl.uniform2fv(gl.getUniformLocation(program, 'u_mouse'), mouse)
    gl.uniform1f(gl.getUniformLocation(program, 'u_time'), now * 0.002)

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

    const positions = [-1, 1, -1, -1, 1, -1, -1, 1, 1, -1, 1, 1]
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.enableVertexAttribArray(positionAttribLocation)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

    gl.vertexAttribPointer(positionAttribLocation, 2, gl.FLOAT, false, 0, 0)

    gl.drawArrays(gl.TRIANGLES, 0, 6)
  }
}

function Canvas() {
  useCanvas({ sketch: () => sketch(), context: 'webgl' })

  useEffect(() => {
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
