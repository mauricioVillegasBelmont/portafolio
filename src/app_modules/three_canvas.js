import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


class ThreeEnvironment{


  // camera;
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 100);
  // renderer;
  renderer = new THREE.WebGLRenderer();

  textureLoader = new THREE.TextureLoader();
  controls;
  scene;

  // plane;
  // mouse;
  // raycaster;
  // isShiftDown = false

  // rollOverMesh;
  // rollOverMaterial
  // cubeGeo;
  // cubeMaterial

  objects = []
  constructor( assets_path ){
    const self = this

    this.setWindowScene();
    document.getElementById('three').appendChild( this.renderer.domElement );
    // document.body
    const textureEquirec = this.textureLoader.load( assets_path+'/img/textures/forest.jpg' );
    textureEquirec.mapping = THREE.EquirectangularRefractionMapping;
    textureEquirec.colorSpace = THREE.SRGBColorSpace;

    this.scene = new THREE.Scene();
    this.scene.background = textureEquirec;



    this.camera.position.set( 0, 0, 2.5 );
    this.controls = new OrbitControls( this.camera, this.renderer.domElement );
    this.controls.minDistance = 1.5;
    this.controls.maxDistance = 6;







    // this.scene.background = new THREE.Color(0x9966ff)


    const size = 200;
    const divisions = 10;
    const gridHelper = new THREE.GridHelper(size, divisions);
    this.scene.add(gridHelper);





    window.addEventListener('resize', function(){self.setWindowScene()}, false)
    this.animate();
  }

  setWindowScene(){
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }
  render(scene, camera) {
    this.camera.lookAt( scene.position );
    this.renderer.render(scene, camera)
  }
  animate() {
    const self = this;
    window.requestAnimationFrame( function(){self.animate()} );
    this.render(this.scene, this.camera);
  }
}
export { ThreeEnvironment }