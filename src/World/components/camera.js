import { PerspectiveCamera } from "three";

export function createCamera() {
  const camera = new PerspectiveCamera(35, 1, 0.1, 100);

  camera.position.set(5, 10, 40);

  camera.tick = (delta) => { };

  return camera;
}
