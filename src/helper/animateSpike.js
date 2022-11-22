import { createNoise3D } from "simplex-noise";
import {
  AmbientLight,
  DirectionalLight,
  Mesh,
  MeshPhongMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  WebGLRenderer,
} from "three";

const animateSpike = (spikeName) => {
  let canvas = document.getElementById(spikeName);
  let renderer = new WebGLRenderer({
    canvas: canvas,
    context: canvas.getContext("webgl2"),
    antialias: true,
    alpha: true,
  });
  let simplex = createNoise3D();

  renderer?.setSize(canvas.width, canvas.height);
  renderer?.setPixelRatio(window.devicePixelRatio || 1);

  let scene = new Scene();
  let camera = new PerspectiveCamera(
    45,
    canvas.width / canvas.height,
    0.1,
    1000
  );

  camera.position.z = 5;

  let geometry = new SphereGeometry(0.8, 128, 128);

  let material = new MeshPhongMaterial({
    color: 0x04befe,
    shininess: 0,
  });

  let lightTop = new DirectionalLight(0xffffff, 0.7);
  lightTop.position.set(0, 500, 200);
  lightTop.castShadow = true;
  scene.add(lightTop);

  let lightBottom = new DirectionalLight(0xffffff, 0.25);
  lightBottom.position.set(0, -500, 400);
  lightBottom.castShadow = true;
  scene.add(lightBottom);

  let ambientLight = new AmbientLight(0x798296);
  scene.add(ambientLight);

  let sphere = new Mesh(geometry, material);

  scene.add(sphere);

  let update = () => {
    const time = performance.now() * 0.00001 * 18 * Math.pow(1, 3);
    const spikes = 0.6 * 2;

    for (let i = 0; i < sphere.geometry.vertices.length; i++) {
      let p = sphere.geometry.vertices[i];
      p.normalize().multiplyScalar(
        1 + 0.3 * simplex(p.x * spikes, p.y * spikes, p.z * spikes + time)
      );
    }

    sphere.geometry.computeVertexNormals();
    sphere.geometry.normalsNeedUpdate = true;
    sphere.geometry.verticesNeedUpdate = true;
  };

  function animate() {
    update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
};

export default animateSpike;
