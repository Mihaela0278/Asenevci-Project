import { PerspectiveCamera, WebGLRenderer } from "three";

const setSize = (container, camera, renderer) => {
    const { clientWidth, clientHeight } = container;

    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(clientWidth, clientHeight);

    renderer.setPixelRatio(window.devicePixelRatio);
}

export class Resizer {
    constructor(container, camera, renderer) {
        setSize(container, camera, renderer);
        window.addEventListener('resize', () => {
            setSize(container, camera, renderer)

            this.onResize();
        });
    }

    onResize() { };
}