import { gsap } from 'gsap';
import * as THREE from 'three';

/**
 * Animates a THREE.Vector3 from initial to target value.
 * 
 * @param {THREE.Vector3} from - The starting vector.
 * @param {THREE.Vector3} to - The target vector.
 * @param {(current: THREE.Vector3) => void} onUpdate - Callback called every frame with the current vector.
 * @param {number} [duration=1] - Optional duration of the animation in seconds.
 */
export function animateVector(from, to, onUpdate, duration = 1) {
    // Clone `from` so we don't mutate it
    const temp = from.clone();

    gsap.to(temp, {
        x: to.x,
        y: to.y,
        z: to.z,
        duration,
        ease: 'circ.out',
        onUpdate: () => {
            onUpdate(temp);
        }
    });
}

/**
 * Animates a vector around a center point in an arc (orbit-like).
 * 
 * @param {THREE.Vector3} from - Starting position.
 * @param {THREE.Vector3} to - Ending position (on the same radius).
 * @param {THREE.Vector3} center - The point to orbit around.
 * @param {(current: THREE.Vector3) => void} onUpdate - Callback for updated position.
 * @param {number} [duration=1] - Duration in seconds.
 */
export function animateOrbit(from, to, center, onUpdate, duration = 1) {
    const startOffset = from.clone().sub(center);
    const endOffset = to.clone().sub(center);

    const startSpherical = new THREE.Spherical().setFromVector3(startOffset);
    const endSpherical = new THREE.Spherical().setFromVector3(endOffset);

    const tempSpherical = startSpherical.clone();
    const tempVector = new THREE.Vector3();

    gsap.to(tempSpherical, {
        theta: endSpherical.theta,
        phi: endSpherical.phi,
        duration,
        ease: "power2.out",
        onUpdate: () => {
            tempVector.setFromSpherical(tempSpherical).add(center);
            onUpdate(tempVector);
        }
    });
}

/**
 * Animates a THREE.Vector3 from initial to target value with a jump over zero (±0.25) if needed.
 * 
 * @param {THREE.Vector3} from - Starting vector.
 * @param {THREE.Vector3} to - Ending vector.
 * @param {(current: THREE.Vector3) => void} onUpdate - Callback called each frame with the interpolated vector.
 * @param {number} [duration=1] - Duration of the full animation in seconds.
 */
export function animateVectorWithJump(from, to, onUpdate, duration = 1) {
  const temp = from.clone();
  const intermediate = temp.clone();
  const epsilon = 0.25;
  const timeline = gsap.timeline({
    defaults: {
      duration: duration / 2,
      ease: 'power2.out',
      onUpdate: () => onUpdate(temp)
    }
  });

  let needsJump = false;

  ['x', 'y', 'z'].forEach((axis) => {
    const start = from[axis];
    const end = to[axis];

    if (start * end < 0) {
      // Crossing zero — add ±epsilon detour
      needsJump = true;
      intermediate[axis] = end > 0 ? epsilon : -epsilon;
    } else {
      intermediate[axis] = start;
    }
  });

  if (needsJump) {
    // Step 1: jump to ±epsilon detour
    timeline.to(temp, { x: intermediate.x, y: intermediate.y, z: intermediate.z });
  }

  // Step 2: move to target
  timeline.to(temp, {
    x: to.x,
    y: to.y,
    z: to.z,
    duration: needsJump ? duration / 2 : duration
  });
}
