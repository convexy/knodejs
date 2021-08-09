window.addEventListener("load", function () {
  window.document.body.style.margin = 0;
  const w = window.innerWidth;
  const h = window.innerHeight;
  
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(w, h);
  renderer.setClearColor(0xffffff, 1);

  const alight = new THREE.AmbientLight(0xa0a0a0);
  scene.add(alight);

  const dlight = new THREE.DirectionalLight(0xf0f0f0, 0.5);
  scene.add(dlight);

  document.body.appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 5;


  const animate2 = function () {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/data?req=rot");
    xhr.addEventListener("load", function () {
      let res = JSON.parse(xhr.responseText);
      cube.rotation.x = res.x;
      cube.rotation.y = res.y;
      renderer.render(scene, camera);

      setTimeout(animate2, 100);
    });
    xhr.send(null);
  };

  animate2();
});
