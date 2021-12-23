import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import useCanvasGL from '../../hooks/useCanvasGL'

const sketch = ({ context }) => {
  const renderer = new THREE.WebGLRenderer({
    context,
  })

  renderer.setClearColor('white', 1)

  const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 100)
  camera.position.set(2, 2, -6)

  const controls = new OrbitControls(camera, context.canvas)

  const scene = new THREE.Scene()

  const mesh = new THREE.Mesh(
    new THREE.SphereBufferGeometry(1, 20, 20),
    new THREE.MeshPhysicalMaterial({
      color: 'brown',
      roughness: 0.75,
      flatShading: true,
    })
  )

  scene.add(mesh)

  const meshes = []

  for (let i = 0; i < 10; i++) {
    const geometry = new THREE.TorusGeometry(1, 0.05, 6, 140)
    const material = new THREE.MeshPhysicalMaterial({
      color: 'red',
      side: THREE.DoubleSide,
    })
    const torus = new THREE.Mesh(geometry, material)

    meshes.push(torus)

    scene.add(torus)
  }

  scene.add(new THREE.AmbientLight('#59314f'))

  const light = new THREE.PointLight('#45caf7', 1, 15.5)
  light.position.set(2, 2, -4).multiplyScalar(1.5)
  scene.add(light)

  return {
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio)
      renderer.setSize(viewportWidth, viewportHeight)
      camera.aspect = viewportWidth / viewportHeight
      camera.updateProjectionMatrix()
    },
    render({ time }) {
      controls.update()

      meshes.forEach((mesh, i) => {
        mesh.rotation.y += Math.cos(time * 10) / 80
        mesh.rotation.x += Math.sin(time * 10) / 120
        mesh.rotation.z += Math.sin(time * 10) / 50

        mesh.scale.x = 1 + i / 20
        mesh.scale.y = 1 + i / 10
      })

      renderer.render(scene, camera)
    },
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
