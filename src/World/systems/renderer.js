import { WebGLRenderer } from "three";

export function createRenderer() {
    const rederer = new WebGLRenderer({antialias: true});

    rederer.physicallyCorrectLights = true;

    return rederer;
}