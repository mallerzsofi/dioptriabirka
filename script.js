let scene, camera, renderer, model;

document.body.addEventListener("click", (e) => {
  // ha linkre kattintasz, ne jelenjen meg a modell
  if (e.target.tagName === "A") return;

  if (model) return;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("modelCanvas"),
    alpha: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // FÉNY (nélküle sok modell láthatatlan)
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(1, 1, 1);
  scene.add(light);

  const ambient = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambient);

  const loader = new THREE.OBJLoader();
  loader.load("3DModel.obj", function(obj) {
    model = obj;
    scene.add(model);
  });

  camera.position.z = 5;

  function animate() {
    requestAnimationFrame(animate);
    if (model) {
      model.rotation.y += 0.01;
    }
    renderer.render(scene, camera);
  }

  animate();
});
