import canvasSketch from 'canvas-sketch'
import gsap from 'gsap'
import { useEffect, useRef } from 'react'
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

  const geometry = new THREE.SphereGeometry(1, 8, 4)
  const baseGeometry = new THREE.IcosahedronGeometry(1, 2)
  const points = Array.from(geometry.attributes.position.array)
  for (let i = 0; i < 300; i += 30) {
    // points.splice(i, 3)
  }

  const uniforms = {
    u_time: { value: 0 },
    u_resolution: {
      value: [1000, 1000],
    },
    u_points: { value: points },
    // u_count: { value: 45 },
    // texture: { value: texture },
    // u_size: { value: '' },
  }

  camera.position.x = 3

  const blabla = [9, 9]
  console.log('length', points.length)
  const FOO = blabla.length
  const material = new THREE.ShaderMaterial({
    defines: {
      POINT_COUNT: points.length / 3,
    },
    uniforms,
    vertexShader,
    fragmentShader,
    side: THREE.DoubleSide,
    // wireframe: true,
  })
  // const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material)
  // const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material)
  const circleGeometry = new THREE.CircleGeometry(1, 32)

  const mesh = new THREE.Mesh(geometry, material)

  const ballMeshes = []
  function getBalls() {
    for (let i = 0; i < points.length; i += 3) {
      // const point = new THREE.Vector3(points[i], points[i + 1], points[i + 2])
      // console.log(point)

      const mesh = new THREE.Mesh(
        // geometry,
        circleGeometry,
        new THREE.MeshBasicMaterial({
          // color: 'white',
          // wireframe: true,
          // side: THREE.DoubleSide,
        })
      )

      // mesh.position.copy(point).multiplyScalar(1.5)
      // mesh.position.copy(point)
      mesh.scale.setScalar(0)
      // mesh.lookAt(new THREE.Vector3())
      ballMeshes.push(mesh)
      scene.add(mesh)
    }
  }

  getBalls()

  scene.add(mesh)

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
      // mesh.rotation.x += 0.01
      // scene.rotation.x += 0.01
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
  const canvasRef = useRef()
  useEffect(() => {
    const settings = {
      canvas: canvasRef.current,
      context: 'webgl',
      animate: true,
      attributes: {
        antialias: true,
      },
    }
    canvasSketch(sketch, settings)
  })

  return <canvas ref={canvasRef}></canvas>
}

export default Canvas
