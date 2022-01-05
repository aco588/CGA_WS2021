import * as THREE from '../../../../lib/three.js-r134/build/three.module.js';
import {GLTFLoader} from '../../../../lib/three.js-r134/examples/jsm/loaders/GLTFLoader.js';

export default class TableFromFile extends THREE.Group {

  constructor() {
    super();
    this.gltfLoader = new GLTFLoader();
    this.loadingDone = false;
    this.load(this);
  }

  load(thisTable) {

    this.gltfLoader.load('src/models/table.gltf', function (gltf) {

      gltf.scene.traverse(function (child) {

        if (child.name === 'surface' || child.name === 'legs') {
          child.receiveShadow = true;
          child.castShadow = true;
        }
      });

      thisTable.add(gltf.scene);
      thisTable.loadingDone = true;
    });
  }

  addPhysics() {
    if (this.loadingDone === false) {
      window.setTimeout(this.addPhysics.bind(this), 100);
    } else {
      //window.physics.addBox(this, 10, 150, 39, 62, 0, 19.5, 0);
      const boundingBox = new THREE.Box3().setFromObject(this);
      const boundingSize = new THREE.Vector3();
      boundingBox.getSize(boundingSize);
      window.physics.addBox(this, 10, boundingSize.x, boundingSize.y, boundingSize.z,
          0, boundingSize.y / 2, 0);
    }
  }
}