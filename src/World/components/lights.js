import { AmbientLight, DirectionalLight, HemisphereLight } from "three";

export function createLights() {
  const mainLight = new DirectionalLight(
    "white",
    8
  );

  mainLight.position.set(5, 5, 30);

  return { mainLight };
}
