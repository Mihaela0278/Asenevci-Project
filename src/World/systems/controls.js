import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from 'three'

export function createControls(camera, canvas) {
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.maxPolarAngle = Math.PI / 1.85;
  controls.minPolarAngle = Math.PI * 0.3;
  controls.minDistance = 0.3;
  controls.maxDistance = 4;

  return controls;
}
