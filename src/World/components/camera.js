import { PerspectiveCamera } from "three";

export const DAFAULT_CAMERA_POSITION = [3.10, 0.71, 0.43];

export function createCamera() {
  const camera = new PerspectiveCamera(35, 1, 0.1, 100);

  camera.position.set(...DAFAULT_CAMERA_POSITION); // read about array deconstruction

  camera.tick = (delta) => { };

  return camera;
}