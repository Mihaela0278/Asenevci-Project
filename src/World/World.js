import { createCamera } from "./components/camera";
import { createLights } from "./components/lights";
import { createScene } from "./components/scene";
import { createControls } from "./systems/controls";
import { Loop } from "./systems/Loop";
import { createRenderer } from "./systems/renderer";
import { Resizer } from "./systems/Resizer";
import { createHorsemen } from "./components/horsemen";
import * as THREE from "three";
import { DAFAULT_CAMERA_POSITION } from "./components/camera";
import { animateVector } from "./Animator";

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

    const loader = new THREE.CubeTextureLoader();
    const skybox = loader.load([
      '/textures/skybox/cube_right.png', //cube_right.png
      '/textures/skybox/scene01495 1.png', // cube_back.png
      '/textures/skybox/cube_up.png',
      '/textures/skybox/cube_down.png',
      '/textures/skybox/scene00186.png', // cube_front.png 
      '/textures/skybox/scene01080 1.png', //cube_left.png
    ]);
    this.scene.background = skybox;

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

    // this.loop.addUpdatable(controls);

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
      new THREE.Vector3(1.65, 0.71, 0.43), // Back view Third Horsemen Цар Петър

      new THREE.Vector3(1.39, 0.79, 0.12), // Right view Second Horsemen Цар Асен

      new THREE.Vector3(-1.74, 0.74, -0.46), // Left view Fourth Horsemen Цар Иван Асен II

      new THREE.Vector3(-1.51, 0.69, -0.39), // Front view First Horsemen Цар Калоян

      new THREE.Vector3(...DAFAULT_CAMERA_POSITION)

    ];

    const directions = [
      new THREE.Vector3(-0.64, 0.26, -0.96), // Third Horsemen Цар Петър

      new THREE.Vector3(-0.51, 0.19, 0.29), // Second Horsemen Цар Асен

      new THREE.Vector3(0.29, 0.32, -0.40), // Fourth Horsemen Цар Иван Асен II

      new THREE.Vector3(1.50, -0.19, 1.99), //First Horsemen Цар Калоян

      new THREE.Vector3(0, 0, 0)
    ]

    if (horsemanIndex >= 0 && horsemanIndex < positions.length) {
      // this.camera.position.copy(positions[horsemanIndex]);
      // this.camera.lookAt(directions[horsemanIndex]);

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
/*
Horseman1 
positions {
  -1.5432431018612618,
  0.4899666036666167,
  0.27564695096399244
}
{
  -1.5731031456184925,
  0.4729821205495868,
  0.3199668733156603
}
directions {
  0.9929573745026885,
  -0.06037849742228608,
  0.10193178831824223
}
   
Horseman2
positions {
  1.3507570918219092,
  0.5822319857446552,
  0.052414942352613625
}

directions {
  -0.9541041988948161,
  -0.12133182190948216,
  0.27379511800506445
}

Horseman3
positions {
  1.1537863139839808,
  0.5506559638269124,
  0.739234689739234
}

directions {
  -0.6444382833574543,
  -0.060378497422286063,
  -0.7622688082247131
}

Horseman4 
positions {
  -1.7469986790948584,
  0.572849657317494,
  -0.5012122952700688
}

directions {
  0.9981704523992279,
  -0.06037849742228607,
  -0.0031913956426813392
}

*/
