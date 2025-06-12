import * as THREE from "three";

export const loadSkybox = (scene) => {
    const loader = new THREE.TextureLoader();
    loader.load('/textures/skybox/panorama.png', (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        texture.encoding = THREE.sRGBEncoding;
        scene.background = texture;
    });
}