import { PerspectiveCamera } from "three";

export const DEFAULT_CAMERA_POSITION = [2.90, 0.71, 0.49]; // 3.10, 0.71, 0.43 2.90, 0.71, 0.49

export function createCamera() {
  const camera = new PerspectiveCamera(35, 1, 0.1, 100);

  camera.position.set(...DEFAULT_CAMERA_POSITION); // read about array deconstruction

  camera.tick = (delta) => { };

  return camera;
}