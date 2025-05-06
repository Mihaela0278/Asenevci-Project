import { Color, Scene } from "three";

export function createScene() {
    const scene = new Scene();

    scene.background = new Color('rgb(36, 35, 35)');

    return scene;
}