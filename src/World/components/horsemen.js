import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import horsemenFile from '../models/horsemen-final.glb'

export function createHorsemen(onLoad) {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  loader.setDRACOLoader(dracoLoader);
  dracoLoader.setDecoderPath("/examples/jsm/libs/draco/");

  loader.load(horsemenFile, onLoad)
}
