let scene, camera, renderer, model;
let started = false;

document.body.addEventListener("click", (e) => {
  // Ne induljon el ha linkre kattintasz
  if (e.target.tagName === "A") return;

  // csak egyszer induljon el
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

  // 💡 FÉNYEK (EZ KELL HOGY LÁTSZÓDJON)
  const light1 = new THREE.DirectionalLight(0xffffff, 1);
  light1.position.set(1, 1, 1);
  scene.add(light1);

  const light2 = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(light2);

  // 📦 MODELL BETÖLTÉS
  const loader = new THREE.OBJLoader();

  loader.load(
    "3DModel.obj",
    function (obj) {
      model = obj;

      // 🔧 MÉRET (ha túl kicsi/nagy lenne)
      model.scale.set(1, 1, 1);

      scene.add(model);
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    function (error) {
      console.error("Hiba a modell betöltésnél:", error);
    }
  );

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
