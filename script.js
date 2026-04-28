let scene, camera, renderer, model;
let started = false;

document.body.addEventListener("click", (e) => {
  if (e.target.tagName === "A") return;
  if (started) return;

  started = true;

  // SCENE
  scene = new THREE.Scene();

  // CAMERA
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  // RENDERER
  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("modelCanvas"),
    alpha: true
  });

  renderer.setSize(window.innerWidth, window.innerHeight);

  // 💡 FÉNYEK
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(1, 1, 1);
  scene.add(light);

  const ambient = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambient);

  // 📦 MODELL
  const loader = new THREE.OBJLoader();

  loader.load("3DModel.obj", (obj) => {
    model = obj;
    model.scale.set(1, 1, 1);
    scene.add(model);
  });

  // 🔁 ANIMÁCIÓ
  function animate() {
    requestAnimationFrame(animate);

    if (model) {
      model.rotation.y += 0.01;
    }

    renderer.render(scene, camera);
  }

  animate();
});
