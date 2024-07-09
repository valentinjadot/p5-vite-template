const SPACE_BETWEEN_PIXELS = 24;
const PIXEL_SIZE = 24;
const CAMERA_INITIAL_DISTANCE = 3000;

const PIXEL_Z_AXIS_FACTOR = 3;
const PIXEL_ZOOM_FACTOR = 6;
const INITIAL_ROTATION_X = 2000;
const ROTATION_X_STEP = 1;
const CANERA_DISTANCE_STEP = 0.5;

export function sketch(p) {
  let milei;

  let canvas;
  let cam;
  let cameraDistance = CAMERA_INITIAL_DISTANCE;
  let rotationX = INITIAL_ROTATION_X;
  let font;
  let mileiPixels;
  let faceElements = [];

  const frasesDeMilei = [
    'Creo que el Estado es el enemigo, creo que el Estado es una asociación criminal…',
    'Entre la mafia y el Estado prefiero a la mafia. La mafia tiene códigos, la mafia cumple, la mafia no miente, la mafia compite',
    'La justicia social es aberrante',
    'Para mí los impuestos son un robo',
    'Cuando están en el poder nos tienen de esclavos',
    'Digamos, o sea, que usted tiene una hija y de repente hay alguien que tiene una adicción a tener violación a mujeres y su hija es víctima. Entonces, ¿qué va a decir? No, hay que terminar con el sistema de coparticipación, hay que barrerlo',
    'Algo que aportaría mucho es que se permitiera que las adopciones fueran un mercado libre y no un mercado regulado por el Estado. Vas a ver cómo aquellas que quedan embarazadas, aun cuando no quieren, van a encontrarle una salida a la situación',
    'El Estado es el pedófilo en el jardín de infantes, con los nenes encadenados y bañados en vaselina. Y los políticos son los que ejecutan el Estado',
    'La venta de órganos humanos es un mercado más',
    'Nosotros valoramos la visión de memoria, verdad y justicia. Pero empecemos por la verdad: no fueron 30.000 desaparecidos, son 8.753',
    'El calentamiento global es otra de las mentiras del socialismo. Hay toda una agenda de marxismo cultural (…). Hace 10 o 15 años se discutía que el planeta se iba a congelar, ahora discuten que se calienta',
    'En mi gobierno no va a haber marxismo cultural y no voy a estar pidiendo perdón por tener pene. Si de mí dependiera, cerraría el Ministerio de la Mujer',
    'Mi misión es cagar a patadas en el culo a keynesianos y colectivistas hijos de puta',
    'Una empresa que contamina el río, ¿dónde está el daño?',
    'No tengan miedo, den la batalla contra el zurderío, que se la vamos a ganar, somos superiores productivamente, somos superiores moralmente; esto no es para tibios, ¡viva la libertad carajo!',
  ];

  p.preload = function () {
    font = p.loadFont('bombita.ttf');
    milei = p.loadImage('milei-75.png');
  };

  p.setup = function () {
    canvas = p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    cam = p.createCamera();

    // Place the camera at the top-center.
    cam.setPosition(0, 0, CAMERA_INITIAL_DISTANCE);

    // Point the camera at the origin.
    cam.lookAt(0, 0, 0);

    milei.loadPixels();
    mileiPixels = new Uint8ClampedArray(milei.pixels);

    p.fill('blue');

    createFace();
  };

  const drawFace = () => {
    for (const element of faceElements) {
      p.push();
      p.translate(element.translate.x, element.translate.y, element.translate.z);
      p.textFont(font);
      p.textSize(element.textSize);
      p.text(element.text, element.x, element.y);
      p.pop();
    }
  };

  const createFace = () => {
    for (let j = 0; j < milei.height; j++) {
      for (let i = 0; i < milei.width; i++) {
        const pixelIndex = (i + j * milei.width) * 4;
        const r = mileiPixels[pixelIndex + 0];
        const g = mileiPixels[pixelIndex + 1];
        const b = mileiPixels[pixelIndex + 2];
        const avg = (r + g + b) / 3;

        if (avg < 0) return;

        const element = {
          translate: {
            x: (-milei.width * SPACE_BETWEEN_PIXELS) / 2,
            y: (-milei.height * SPACE_BETWEEN_PIXELS) / 2,
            z: -PIXEL_Z_AXIS_FACTOR * avg,
          },
          textSize: (PIXEL_SIZE / avg) * PIXEL_ZOOM_FACTOR + PIXEL_SIZE,
          text: 'a',
          x: i * SPACE_BETWEEN_PIXELS,
          y: j * SPACE_BETWEEN_PIXELS,
        };

        faceElements.push(element);
      }
    }
  };

  p.draw = function () {
    p.background('blue');
    p.orbitControl(3, 3, 3);

    animateFaceMovement();

    const probabilityToFlash = calculateProbability(cameraDistance);

    console.log(probabilityToFlash);

    if (Math.random() < probabilityToFlash) {
      flashFace();
    }

    drawFace();
    cam.setPosition(rotationX, 0, cameraDistance);
    cam.lookAt(0, 0, 0);
  };

  const moveCamera = function (event) {
    if (event.deltaY === 0) return;
    zoomOut(event);
    rotateCamera(event);
  };

  const zoomOut = (event) => {
    cameraDistance = Math.min(
      CAMERA_INITIAL_DISTANCE,
      Math.max(cameraDistance - event.deltaY * CANERA_DISTANCE_STEP, 0),
    );
  };

  const rotateCamera = (event) => {
    rotationX = Math.min(
      INITIAL_ROTATION_X,
      Math.max(rotationX - event.deltaY * ROTATION_X_STEP, 0),
    );
  };

  const animateFaceMovement = () => {
    if (rotationX === 0 && cameraDistance === 0) {
      rotationX = INITIAL_ROTATION_X;
      cameraDistance = CAMERA_INITIAL_DISTANCE;
    }

    moveCamera({ deltaY: 10 });
  };

  function calculateProbability(z, z_max = 4000, k = 5, steepNess = 3.5) {
    return 1 - Math.exp(-k * Math.pow((z_max - z) / z_max, steepNess));
  }
  const flashFace = () => {
    p.fill('white');
    setTimeout(() => {
      p.fill('blue');
    }, 150);
  };
}
