import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from 'three'

export function createControls(camera, canvas) {
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.maxPolarAngle = Math.PI / 2.08;
  controls.minDistance = 0.3;
  controls.maxDistance = 4;

  let lastUpdateTime = 0;
  const frameInterval = 1000 / 30; // Target ~30 FPS

  controls.tick = (delta) => {
    const now = performance.now();
    if (now - lastUpdateTime >= frameInterval) {
      controls.update();
      lastUpdateTime = now;
      console.log("position", camera.position);
      const direction = new THREE.Vector3();
      console.log("direction", camera.getWorldDirection(direction));

    }
  };

  return controls;
}
