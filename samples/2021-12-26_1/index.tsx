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

  renderer.setClearColor('#000', 1)

  const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 100)
  camera.position.set(0, 0, -4)
  camera.lookAt(new THREE.Vector3())

  const controls = new OrbitControls(camera, context.canvas)

  const scene = new THREE.Scene()

  const point = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.1, 16, 16),
    new THREE.MeshBasicMaterial({ color: 'red' })
  )
  scene.add(point)

  const raycaster = new THREE.Raycaster()

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
      point.position.y = Math.sin(time)

      const rayOrigin = new THREE.Vector3(-3, 0, 0)
      const rayDirection = new THREE.Vector3(1, 0, 0)
      rayDirection.normalize()

      raycaster.set(rayOrigin, rayDirection)

      const objectsToTest = [point]
      const intersects = raycaster.intersectObjects(objectsToTest)

      for (const object of objectsToTest) {
        object.material.color.set('red')
      }
      for (const intersect of intersects) {
        // @ts-ignore
        intersect.object.material.color.set('green')
      }

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
