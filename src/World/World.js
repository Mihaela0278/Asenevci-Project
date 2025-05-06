import { createCamera } from "./components/camera";
import { createLights } from "./components/lights";
import { createScene } from "./components/scene";
import { createControls } from "./systems/controls";
import { Loop } from "./systems/Loop";
import { createRenderer } from "./systems/renderer";
import { Resizer } from "./systems/Resizer";
import { createHorsemen } from "./components/horsemen";
import * as THREE from "three";

export class World {
  camera;
  scene;
  renderer;
  loop;

  constructor(container) {
    this.camera = createCamera();
    this.scene = createScene();
    this.renderer = createRenderer();
    this.loop = new Loop(this.camera, this.renderer, this.scene);

    const loader = new THREE.CubeTextureLoader();
    const skybox = loader.load([
      '/textures/skybox/cube_right.png',
      '/textures/skybox/cube_left.png',
      '/textures/skybox/cube_up.png',
      '/textures/skybox/cube_down.png',
      '/textures/skybox/cube_back.png',
      '/textures/skybox/cube_front.png',
    ]);
    this.scene.background = skybox;

    this.renderer = createRenderer();
    this.loop = new Loop(this.camera, this.renderer, this.scene); // do tuk e koda za skybox

    const controls = createControls(this.camera, this.renderer.domElement);

    createHorsemen((horsemen) => {
      horsemen.scene.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshBasicMaterial({ map: child.material.map });
        }
      });

      this.scene.add(horsemen.scene);
    });

    container.append(this.renderer.domElement);

    this.loop.addUpdatable(controls);

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

  setCameraPosition(horsemanIndex) {
    const positions = [
      new THREE.Vector3(1.6537863139839808,
        0.7106559638269124,
        0.439234689739234), // Back view Third Horsemen Цар Петър

      new THREE.Vector3(1.3937570918219092,
        0.7995319857446552,
        0.12414942352613625), // Right view Second Horsemen Цар Асен

      new THREE.Vector3(-1.7469986790948584,
        0.742849657317494,
        -0.4626950965270068), // Left view Fourth Horsemen Цар Иван Асен II

      new THREE.Vector3(-1.5132431018612618,
        0.6999666036666169,
        -0.392695096399244) // Front view First Horsemen Цар Калоян
    ];

    const directions = [
      new THREE.Vector3(-0.6444382833574543,
        0.260378497422286063,
        -0.9622688082247131), // Third Horsemen Цар Петър


      new THREE.Vector3(-0.5136425262826265,
        0.1923445821909482,
        0.2965422345678124), // Second Horsemen Цар Асен

      new THREE.Vector3(0.2981704523992279,
        0.32037849742228607,
        -0.4031913956426813392), // Fourth Horsemen Цар Иван Асен II

      new THREE.Vector3(1.5029573745026885,
        -0.19137849742228608,
        1.99564695096399244) //First Horsemen Цар Калоян
    ]

    if (horsemanIndex >= 0 && horsemanIndex < positions.length) {
      this.camera.position.copy(positions[horsemanIndex]);
      this.camera.lookAt(directions[horsemanIndex]);
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
