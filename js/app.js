d3.csv("./rtest.csv", function(error, data) {
    if (error) throw error;
    console.log(data);
    rest(data)
});
function rest(data){
  var renderer, scene, camera;
  var particleSystem, uniforms, geometry;
  var particles = data.length;
  console.log("Lungime Vector = ",particles)
  var WIDTH = window.innerWidth;
  var HEIGHT = window.innerHeight;
  init();
  animate();
  function init() {
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    var container = document.getElementById( 'container' );
    container.appendChild( renderer.domElement );
    camera = new THREE.PerspectiveCamera( 50, WIDTH / HEIGHT, 1, 10000 );
    camera.position.z = 30;
    camera.position.y = -50;
    camera.rotation = 140 * Math.PI / 180
    controls = new THREE.TrackballControls( camera );
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;
    controls.keys = [ 65, 83, 68 ];
    controls.addEventListener( 'change', render );
    var radius = 200;
    geometry = new THREE.BufferGeometry();
    var positions = new Float32Array( particles * 3 );
    var colors = new Float32Array( particles * 3 );
    var sizes = new Float32Array( particles );
    var color = new THREE.Color();
    for ( var i = 0, i3 = 0; i < particles; i ++, i3 += 3 ) {
      if(i<40){ console.log("X is ",data[i]["X"])}
      positions[ i3 + 0 ] = data[i]["X"];
      positions[ i3 + 1 ] = data[i]["Y"];
      positions[ i3 + 2 ] = data[i]["Z"];
      time_normal_unq = 70550294;
      color.setHSL( time_normal_unq, 1, 0.5 );
      colors[ i3 + 0 ] = color.r;
      colors[ i3 + 1 ] = color.g;
      colors[ i3 + 2 ] = color.b;
      sizes[ i ] = 1;
    }
    geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
    geometry.addAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );
    geometry.addAttribute( 'size', new THREE.BufferAttribute( sizes, 1 ) );
    pMaterial = new THREE.ParticleBasicMaterial({
        color: 0x46CB18,
        size: 15
      });
    particleSystem = new THREE.Points( geometry, pMaterial );
    scene.add( particleSystem );
    window.addEventListener( 'resize', onWindowResize, false );
  }
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
  }
  function animate() {
    requestAnimationFrame( animate );
    controls.update();
    render();
  }
  function render() {
    var time = Date.now() * 0.005;
    var sizes = geometry.attributes.size.array;
    geometry.attributes.size.needsUpdate = true;
    renderer.render( scene, camera );
	console.log(camera.position);

  }
}
