import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import useCanvasGL from '../../hooks/useCanvasGL'

const sketch = ({ context }) => {
  const renderer = new THREE.WebGLRenderer({
    context,
  })

  // const dat = require('dat.gui')
  // const gui = new dat.GUI()
  // gui.domElement.id = 'gui'

  // WebGL background color
  renderer.setClearColor('#000', 1)

  // Setup a camera
  const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 100)
  camera.position.set(2, 2, -4)
  camera.lookAt(new THREE.Vector3())

  const controls = new OrbitControls(camera, context.canvas)

  const scene = new THREE.Scene()

  const particlesGeometry = new THREE.BufferGeometry()
  const count = 500

  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10
    colors[i] = Math.random()
  }

  particlesGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3)
  )
  particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  const boxes = []
  const boxGeometry = new THREE.TorusGeometry(0.1, 0.04, 32, 32, Math.PI * 2)
  const boxMaterial = new THREE.MeshNormalMaterial()
  for (let i = 0; i < positions.length; i += 3) {
    console.log(positions[i])
    const mesh = new THREE.Mesh(boxGeometry, boxMaterial)

    boxes.push(mesh)
    scene.add(mesh)
    mesh.position.set(positions[i], positions[i + 1], positions[i + 2])
  }

  const particlesMaterial = new THREE.PointsMaterial()
  particlesMaterial.size = 0.03
  particlesMaterial.color = new THREE.Color('orange')
  particlesMaterial.sizeAttenuation = true
  particlesMaterial.vertexColors = true

  const particles = new THREE.Points(particlesGeometry, particlesMaterial)

  scene.add(particles)

  // const material = new THREE.MeshStandardMaterial()
  // material.metalness = 0.7
  // material.roughness = 0.2
  // material.envMap = environmentMapTexture

  // gui.add(material, 'metalness').min(0).max(1).step(0.0001)
  // gui.add(material, 'roughness').min(0).max(1).step(0.0001)
  // gui.add(material, 'aoMapIntensity').min(0).max(10).step(0.0001)
  // gui.add(material, 'displacementScale').min(0).max(1).step(0.0001)

  // gui.add(mesh.material, 'wireframe')

  const light = new THREE.PointLight(0xffffff, 0.5)
  light.position.set(2, 3, 4).multiplyScalar(1.5)
  scene.add(light)

  return {
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio)
      renderer.setSize(viewportWidth, viewportHeight)
      camera.aspect = viewportWidth / viewportHeight
      camera.updateProjectionMatrix()
    },

    render({ time }) {
      const positions = Array.from(particlesGeometry.attributes.position.array)
      const newPositions = [...positions]

      for (let i = 0; i < count; i++) {
        const index = i * 3

        const x = particlesGeometry.attributes.position.array[index]

        newPositions[index + 1] = Math.sin(time + x)
        // @ts-ignore: array read only
        particlesGeometry.attributes.position.array[index + 1] = Math.sin(
          time + x
        )
      }

      boxes.forEach((box) => {
        box.position.y = Math.sin(time + box.position.x)
      })

      particlesGeometry.attributes.position.needsUpdate = true

      controls.update()
      renderer.render(scene, camera)
    },
    // Dispose of WebGL context (optional)
    unload() {
      renderer.dispose()
    },
  }
}
function Canvas() {
  useCanvasGL({ sketch: () => sketch })

  return ''
}
export default Canvas
