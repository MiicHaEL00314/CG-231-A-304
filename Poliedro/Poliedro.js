var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(WIDTH, HEIGHT);
renderer.setClearColor(0xDDDDDD, 1);
document.body.appendChild(renderer.domElement);
var scene = new THREE.Scene();

//Creación de malla
        const size = 500;
        const divisiones = 1000;
        const gridHelper = new THREE.GridHelper( size, divisiones );
        scene.add( gridHelper );


        //Creación de ejes X,Y,Z
        const axesHelper1 = new THREE.AxesHelper( 50 );
        const axesHelper2 = new THREE.AxesHelper( -50 );
        scene.add( axesHelper1,axesHelper2 )




// Posición de la camara
var camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT);
camera.position.x = 5;
camera.position.y = 2;
camera.position.z = 3;

const light = new THREE.AmbientLight(0x404040, 5);
scene.add(light);


// Funciones

function Poligono(nlados, radio) {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
  
    // Calcular vértices del polígono
    const ang = (2 * Math.PI) / nlados;
    for (let i = 0; i < nlados + 1; i++) {
      const x = radio * Math.cos(i * ang);
      const y = radio * Math.sin(i * ang);
      vertices.push(x, y, 0); // Se agregan la coordenada Z como 0
    }
  
//Agreagar a la escena
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  
    // Se crea un material para el polígono
    const material = new THREE.LineBasicMaterial({ color: 0x000000 ,wireframe: true});
  
    // Se crea un objeto de malla que combina la geometría y el material
    const poligono = new THREE.Line(geometry, material);
  
    return poligono;
  }

  function Poligono3D(nlados, radio, altura) {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const indices = [];

    // Se calculan los vértices del polígono
    const ang = (2 * Math.PI) / nlados;
    for (let i = 0; i < nlados; i++) {
        const x = radio * Math.cos(i * ang);
        const y = radio * Math.sin(i * ang);
        vertices.push(x, y, 0);
        vertices.push(x, y, altura);
    }

    // Se agrega los dos últimos vértices para cerrar las caras
    vertices.push(radio, 0, 0);
    vertices.push(radio, 0, altura);

    // Se asigna los vértices a la geometría
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    // Se agrega los índices para definir las caras
    for (let i = 0; i < nlados; i++) {
        const startIndex = i * 2;
        indices.push(startIndex, startIndex + 1, startIndex + 3);
        indices.push(startIndex, startIndex + 3, startIndex + 2);
    }

    // Añadimos los índices para cerrar las caras superior e inferior
    const numVertices = vertices.length / 3;
    const ultimoVertice = numVertices - 1;
    const penultimoVertice = numVertices - 2;
    for (let i = 0; i < nlados; i++) {
        indices.push(ultimoVertice - i * 2, ultimoVertice - (i + 1) * 2, penultimoVertice);
        indices.push(i * 2, (i + 1) * 2, ultimoVertice - i * 2 - 1);
    }

    // Se asignan los índices a la geometría
    geometry.setIndex(indices);

    // Se crea un material para el polígono
    const material = new THREE.LineBasicMaterial({ color: 0x000000 ,wireframe: true});

    // Se crea un objeto de malla que combina la geometría y el material
    const poligono = new THREE.Line(geometry, material);

    return poligono;
}



var poligon3D = Poligono3D(5,1,2);
scene.add(poligon3D);
// Rotacion de la figura
poligon3D.rotation.x=-(Math.PI/2);
poligon3D.rotation.y=0;
poligon3D.rotation.z=0;


const controls = new THREE.OrbitControls(camera, renderer.domElement);  

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();
