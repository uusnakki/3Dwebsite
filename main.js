import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();


const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(50);

renderer.render( scene, camera);

//Torus

const geometry = new THREE.TorusGeometry( 25, 3, 16, 1000 );
const stationTexture = new THREE.TextureLoader().load('./images/stationTexture.PNG')
const material = new THREE.MeshBasicMaterial( { map: stationTexture} );

const torus = new THREE.Mesh( geometry, material );

scene.add( torus );

// Lights

const pointLight = new THREE.PointLight(0xfffffff)
pointLight.position.set(5, 5, 5)

const ambientLight = new THREE.AmbientLight(0xfffffff)
scene.add(pointLight, ambientLight)

// Helpers

//const lightHelper = new THREE.PointLightHelper(pointLight)
//const gridHelper = new THREE.GridHelper(200, 50)
//scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement)

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( {color: 0xfffff} )
  const star = new THREE.Mesh( geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ));

  star.position.set(x,y,z);
  scene.add(star)
}

Array(200).fill().forEach(addStar)

//Background photo

const spaceTexture = new THREE.TextureLoader().load('./images/space.PNG');
scene.background = spaceTexture;


//Avatar

const joonasTexture = new THREE.TextureLoader().load('./images/mina.PNG')

const joonas = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial( {map: joonasTexture} )
);

scene.add(joonas)

//Planet

const planetQTexture = new THREE.TextureLoader().load('./images/questions.PNG');

const planetQ = new THREE.Mesh(
  new THREE.SphereGeometry(5, 22, 32),
  new THREE.MeshStandardMaterial({
    map: planetQTexture
  })
)

scene.add(planetQ)

planetQ.position.z = 10
planetQ.position.x = -10

joonas.position.z = -5
joonas.position.x = 2


//Text cube
//const textTexture = new THREE.CanvasTexture(canvas)
// const geometry2 = new THREE.BoxGeometry( 1, 1, 1 );
// const material2 = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
// const cube = new THREE.Mesh( geometry2, material2 );

// scene.add( cube );

// Camera movement

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  planetQ.rotation.x += 0.105
  planetQ.rotation.y += 0.075
  planetQ.rotation.z += 0.05

  joonas.rotation.y += 0.02

  camera.position.z = t * -0.01
  camera.position.x = t * -0.0002
  camera.position.y = t * -0.0002
  
  
}

document.body.onscroll = moveCamera


function animate() {
  requestAnimationFrame( animate );
  
  torus.rotation.x += 0.002
  torus.rotation.y += 0.005
  torus.rotation.z += 0.01

  planetQ.rotation.x += 0.005
  
  controls.update()
  
  renderer.render( scene, camera);

}

animate()