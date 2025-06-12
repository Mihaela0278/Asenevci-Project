import { createCamera } from "./components/camera";
import { createLights } from "./components/lights";
import { createScene } from "./components/scene";
import { createControls } from "./systems/controls";
import { Loop } from "./systems/Loop";
import { createRenderer } from "./systems/renderer";
import { Resizer } from "./systems/Resizer";
import { createHorsemen } from "./components/horsemen";
import * as THREE from "three";
import { DEFAULT_CAMERA_POSITION } from "./components/camera";
import { animateVector } from "./Animator";
import { loadSkybox } from "./components/skybox"

const isMobile = window.innerWidth <= 768;

export class World {
  camera;
  scene;
  renderer;
  loop;
  controls;
  lookingAt = new THREE.Vector3(0, 0, 0)

  constructor(container) {
    this.camera = createCamera();
    this.scene = createScene();
    this.renderer = createRenderer();
    this.loop = new Loop(this.camera, this.renderer, this.scene);

    loadSkybox(this.scene)

    this.renderer = createRenderer();
    this.loop = new Loop(this.camera, this.renderer, this.scene); // do tuk e koda za skybox

    this.controls = createControls(this.camera, this.renderer.domElement);

    createHorsemen((horsemen) => {
      horsemen.scene.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshBasicMaterial({ map: child.material.map });
        }
      });

      this.scene.add(horsemen.scene);
    });

    container.append(this.renderer.domElement);

    const { mainLight } = createLights();

    this.scene.add(mainLight);

    const resizer = new Resizer(container, this.camera, this.renderer);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  start() {
    this.loop.start();
  }

  stop() {
    this.loop.stop();
  }

  toggleControls(enable) {
    if (enable !== undefined) {
      this.controls.enabled = enable
    } else {
      this.controls.enable = !this.controls.enable;
    }
  }

  setCameraPosition(horsemanIndex) {
    const positions = [
      isMobile ? new THREE.Vector3(1.7, 0.7, 0.47) : new THREE.Vector3(1.65, 0.71, 0.43), // Back view Third Horsemen Цар Петър

      isMobile ? new THREE.Vector3(1.45, 0.8, 0.67) : new THREE.Vector3(1.39, 0.79, 0.12), // Right view Second Horsemen Цар Асен

      isMobile ? new THREE.Vector3(-1.8, 0.83, -0.67) : new THREE.Vector3(-1.74, 0.74, -0.46), // Left view Fourth Horsemen Цар Калоян Цар Иван Асен II

      isMobile ? new THREE.Vector3(-1.78, 0.68, -0.64) : new THREE.Vector3(-1.51, 0.69, -0.39), // Front view First Horsemen Цар Иван Асен II

      isMobile ? new THREE.Vector3(4.2, 0.6, 0.66) : new THREE.Vector3(...DEFAULT_CAMERA_POSITION)

    ];

    const directions = [
      new THREE.Vector3(-0.64, 0.26, -0.96), // Third Horsemen Цар Петър

      new THREE.Vector3(-0.51, 0.19, 0.29), // Second Horsemen Цар Асен

      new THREE.Vector3(0.29, 0.32, -0.40), // Fourth Horsemen Цар Калоян

      new THREE.Vector3(1.50, -0.19, 1.99), //First Horsemen Цар Иван Асен II

      new THREE.Vector3(0, 0, 0)
    ]

    if (horsemanIndex >= 0 && horsemanIndex < positions.length) {
      animateVector(this.camera.position, positions[horsemanIndex], (newPos) => {
        this.camera.position.copy(newPos);
      }, 2)

      animateVector(this.lookingAt, directions[horsemanIndex], (newPos) => {
        this.camera.lookAt(newPos)
      }, 2.5)

      this.lookingAt = directions[horsemanIndex];

    }
  }
}