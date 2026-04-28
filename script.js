let scene, camera, renderer, model;
let started = false;

document.body.addEventListener("click", (e) => {
  if (e.target.tagName === "A") return;
  if (started) return;
  started = true;

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("modelCanvas"),
    alpha: true
  });

  renderer.setSize(window.innerWidth, window.innerHeight);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(1, 1, 1);
  scene.add(light);

  const loader = new THREE.OBJLoader();

  loader.load("3DModel.obj", (obj) => {
    model = obj;
    scene.add(model);
  });

  function animate() {
    requestAnimationFrame(animate);

    if (model) model.rotation.y += 0.01;

    renderer.render(scene, camera);
  }

  animate();
});
