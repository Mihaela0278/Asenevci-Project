import { PerspectiveCamera } from "three";

export const DAFAULT_CAMERA_POSITION = [2.90, 0.71, 0.49]; // 3.10, 0.71, 0.43

export function createCamera() {
  const camera = new PerspectiveCamera(35, 1, 0.1, 100);

  camera.position.set(...DAFAULT_CAMERA_POSITION); // read about array deconstruction
  console.log(...DAFAULT_CAMERA_POSITION);

  camera.tick = (delta) => { };

  return camera;
}