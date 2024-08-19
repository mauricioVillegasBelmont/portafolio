import * as THREE from 'three'

import { ThreeCoreBuilder } from "./hooks/ThreeEnvironment";
import  ModelLoaderAPI  from "./API/modelsAPI";

import Butterfly from "./hooks/butterfly";

class ThreeEnvironment {
  scene;
  camera;
  renderer;
  textureLoader;
  handleResizers;
  controls;
  assets_path;

  textureLoader = new THREE.TextureLoader();
  sceneAnimations = {};
  constructor(id, assets_path) {
    const self = this;
    const {
      scene,
      camera,
      renderer,
      textureLoader,
      controls,
      handleResizers,
      animate,
      sceneAnimations,
      sceneAdd,
    } = ThreeCoreBuilder();
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.controls = controls;
    this.handleResizers = handleResizers;
    this.animate = animate;
    this.assets_path = assets_path;
    this.textureLoader = textureLoader;
    this.sceneAnimations = sceneAnimations;

    this.init(id);
  }

  init(id) {
    document.getElementById(id).appendChild(this.renderer.domElement);
    this.setListeners();
    this.setedEnvironment();
    this.handleResizers();
    this.animate();
    this.setCharacters();
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
  }

  setListeners() {
    window.addEventListener("resize", this.handleResizers);
  }

  setedEnvironment() {
    const textureEquirec = this.textureLoader.load(
      this.assets_path + "/img/textures/forest.jpg"
    );
    textureEquirec.mapping = THREE.EquirectangularRefractionMapping;
    textureEquirec.colorSpace = THREE.SRGBColorSpace;
    this.scene.background = textureEquirec;
  }
  setCharacters() {
    let path = this.assets_path + "/models/butrefly-test.gltf";
    ModelLoaderAPI.getModel(path).then((model) => {
      const buterfly = new Butterfly(model);
      buterfly.setPosition({
        x: 10,
      });
      buterfly.setRotation({
        y: 2,
      });
      this.sceneAnimations["buterfly"] = buterfly;
      this.sceneAnimations["buterfly"].stAnimation("flying");


      this.scene.add(this.sceneAnimations["buterfly"].character);
    });
  }
}
export { ThreeEnvironment }