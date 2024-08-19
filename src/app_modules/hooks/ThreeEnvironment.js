import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import { WindowUtils } from "../utils/windowUtils";
import { element } from "three/examples/jsm/nodes/Nodes.js";

export function ThreeCoreBuilder() {
  const light = new THREE.AmbientLight(0x404040, Math.PI * 6); // soft white light
  const clock = new THREE.Clock();
  const textureLoader = new THREE.TextureLoader();
  const sceneAnimations = {}

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(WindowUtils.getWidth, WindowUtils.getHeight);

  const scene = new THREE.Scene();
  scene.add(light);
  scene.background = new THREE.Color(0xffffff);
  scene.fog = new THREE.Fog(0x686f87, 500, 1200);


  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

  // camera.lookAt(new THREE.Vector3(1, 0, 0));
  // camera.updateProjectionMatrix();

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 1.5;
  controls.maxDistance = 6;

  const handleResizers = () => {

    camera.aspect = WindowUtils.aspectRatio;
    camera.updateProjectionMatrix();
    renderer.setSize(WindowUtils.getWidth, WindowUtils.getHeight);

  };
  const animate = () => {
    const delta = clock.getDelta();
    controls.update(delta);
    renderer.render(scene, camera);
    for (const key in sceneAnimations) {
      sceneAnimations[key].update({
        delta: delta,
        scene: scene,
        camera: camera,
      });
    }
    requestAnimationFrame(animate);
  };
  const sceneAdd = (character) => {
    scene.add(character);
  };
  return {
    scene,
    camera,
    renderer,
    textureLoader,
    controls,
    handleResizers,
    animate,
    sceneAnimations,
    sceneAdd,
  };
}
