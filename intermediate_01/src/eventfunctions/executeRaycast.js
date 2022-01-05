import * as THREE from '../../../lib/three.js-r134/build/three.module.js';

window.raycaster = new THREE.Raycaster();

export function executeRaycast() {

  window.raycaster.setFromCamera(window.mousePosition, window.camera);
  let intersects = window.raycaster.intersectObject(window.scene, true);

  if (intersects.length > 0) {
    let firstHit = intersects[0].object;

    if(firstHit.name === 'powerKnob') {
      if (firstHit._children.length > 0) {
        firstHit.userData.toggleEndPosition();
      } else {
        firstHit.paren.userData.toggleEndPosition();
      }
    }
  }
}