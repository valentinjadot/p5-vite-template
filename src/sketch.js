const SPACE_BETWEEN_PIXELS = 24;
const PIXEL_SIZE = 24;
const PIXEL_Z_AXIS_FACTOR = 3;
const PIXEL_ZOOM_FACTOR = -5;

const CAMERA_INITIAL_DISTANCE = 2500;
const CANERA_DISTANCE_STEP = 0.6;

const INITIAL_ROTATION_X = 3000;
const ROTATION_X_STEP = 2;

const BACKGOUND_COLOR = '#171717';
const BOMBITAS_COLOR = '#00bd41';
const TEXT_COLOR = '#F27BBD';

export function sketch(p) {
  let milei;

  let canvas;
  let cam;
  let cameraDistance = CAMERA_INITIAL_DISTANCE;
  let rotationX = INITIAL_ROTATION_X;
  let font;
  let mileiPixels;
  let faceElements = [];

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
    p.fill(BOMBITAS_COLOR);

    createFace();
  };

  const drawFace = () => {
    for (const element of faceElements) {
      const probabilityToGlitch = calculateProbability(cameraDistance);
      if (Math.random() > probabilityToGlitch) {
        p.push();
        p.fill(BOMBITAS_COLOR);
        p.translate(
          element.translate.x,
          element.translate.y,
          element.translate.z * p.random(-100, 100),
        );
        p.textFont(font);
        p.textSize(element.textSize * 2);
        p.text(element.text, element.x, element.y);
        p.pop();
      }

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
    p.background(BACKGOUND_COLOR);
    p.orbitControl(3, 3, 3);

    animateFaceMovement();

    const probabilityToGlitch = calculateProbability(cameraDistance);
    if (Math.random() > probabilityToGlitch) {
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

  function calculateProbability(z, z_max = 4000, k = 40, steepNess = 5) {
    return 1 - Math.exp(-k * Math.pow((z_max - z) / z_max, steepNess));
  }

  const flashFace = () => {
    p.noFill();
    setTimeout(() => {
      p.fill(BOMBITAS_COLOR);
    }, 150);
  };
}
