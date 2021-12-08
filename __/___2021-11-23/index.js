import canvasSketch from 'canvas-sketch'
import gsap from 'gsap'
import { useEffect } from 'react'
import { resetCanvas } from '../../../utiles'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import fragmentShader from './shaders/fs.frag'
import vertexShader from './shaders/vs.vert'
import { Material } from 'three'

const tls = []

const sketch = ({ context, width, height, time }) => {
  const renderer = new THREE.WebGLRenderer({
    context,
  })

  // WebGL background color
  renderer.setClearColor('#000', 1)

  // Setup a camera
  const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 100)

  camera.position.set(0, 0, 1)
  camera.lookAt(new THREE.Vector3())

  // Setup camera controller
  const controls = new OrbitControls(camera, context.canvas)

  // Setup your scene
  const scene = new THREE.Scene()

  const uniforms = {
    u_time: { value: 0 },
    u_resolution: {
      value: [1000, 1000],
      // x: 0,
      // y: 0,
      // },
    },
    // texture: { value: texture },
    // u_size: { value: '' },
  }

  camera.position.x = 3

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    side: THREE.DoubleSide,
    // wireframe: true,
  })
  // const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material)
  // const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material)
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 16), material)
  // mesh.scale.set(0.2)

  scene.add(mesh)

  // const axesHelper = new THREE.AxesHelper(5)
  // scene.add(axesHelper)
  // camera.position.x = -10

  // Specify an ambient/unlit colour
  // scene.add(new THREE.AmbientLight('white'))

  // Add some light
  // const light = new THREE.PointLight('white', 1, 15.5)
  // light.position.set(1, 1, 1).multiplyScalar(1.5)
  // scene.add(light)

  return {
    resize({ pixelRatio, viewportWidth, viewportHeight, width, height }) {
      renderer.setPixelRatio(pixelRatio)
      renderer.setSize(viewportWidth, viewportHeight)
      camera.aspect = viewportWidth / viewportHeight
      camera.updateProjectionMatrix()
      material.uniforms.u_resolution.value.x = width
      material.uniforms.u_resolution.value.y = height
    },
    // And render events here
    render({ time, deltaTime }) {
      material.uniforms.u_time.value = time
      mesh.rotation.x += 0.01
      // mesh.rotation.y += 0.01
      // mesh.rotation.y = time * ((10 * Math.PI) / 180)
      controls.update()
      renderer.render(scene, camera)
    },
    // Dispose of WebGL context (optional)
    unload() {
      renderer.dispose()
    },
  }
}

const Canvas = () => {
  let manager
  useEffect(() => {
    const canvas = document.getElementById('canvasGL')

    resetCanvas('webgl')

    const settings = {
      canvas,
      context: 'webgl',
      animate: true,
      attributes: {
        antialias: true,
      },
    }
    async function init() {
      manager = await canvasSketch(sketch, settings)
    }
    init()

    return () => {
      // Unload previous canvas sketch
      manager?.unload()

      // kill all gsap animations
      tls.forEach((tl) => {
        tl.kill()
      })
      tls.length = 0
    }
  })

  return ''
}

export default Canvas
