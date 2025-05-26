import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from 'three'

export function createControls(camera, canvas) {
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.maxPolarAngle = Math.PI / 2.08;
  controls.minDistance = 0.3;
  controls.maxDistance = 4;

  controls.enablePan = false; // за спиране на взаимодействие с десния бутон на мишката

  return controls;
}
