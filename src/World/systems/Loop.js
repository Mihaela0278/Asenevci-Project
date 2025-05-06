import { Clock } from "three";

export class Loop {
    camera;
    renderer;
    scene;
    updatables;
    clock;

    constructor(camera, renderer, scene) {
        this.camera = camera;
        this.renderer = renderer;
        this.scene = scene;
        this.updatables = [];
        this.clock = new Clock();

    }

    start() {
        this.clock.getDelta();
        this.renderer.setAnimationLoop(() => {
            this.tick();

            this.renderer.render(this.scene, this.camera);
        })
    }
    stop() {
        this.renderer.setAnimationLoop(null);
    }

    addUpdatable(updatable) {
        this.updatables.push(updatable);
    }

    tick() {

        const delta = this.clock.getDelta();
        for (const object of this.updatables) {
            object.tick(delta);
        }
    }
}