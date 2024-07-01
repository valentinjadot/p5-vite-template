const SPACE_BETWEEN_PIXELS = 24;
const PIXEL_SIZE = 24;
const CAMERA_INITIAL_DISTANCE = 3000;

const PIXEL_Z_AXIS_FACTOR = 3;
const PIXEL_ZOOM_FACTOR = 10;
const INITIAL_ROTATION_X = 4000;
const ROTATION_X_STEP = 50;
const CANERA_DISTANCE_STEP = 0.5;

export function sketch(p) {
  let milei;
  let bombita;
  let canvas;
  let cam;
  let cameraDistance = CAMERA_INITIAL_DISTANCE;
  let rotationX = INITIAL_ROTATION_X;
  let font;

  p.preload = function () {
    font = p.loadFont('bombita.ttf');
  };

  p.setup = function () {
    milei = p.loadImage('cropped-75.png');
    bombita = p.loadImage('bomb.svg');
    canvas = p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    cam = p.createCamera();

    // Place the camera at the top-center.
    cam.setPosition(0, 0, CAMERA_INITIAL_DISTANCE);

    // Point the camera at the origin.
    cam.lookAt(0, 0, 0);

    canvas.mouseWheel(moveCamera);
  };

  const drawFace = () => {
    p.background('red');

    milei.loadPixels();
    for (let j = 0; j < milei.height; j++) {
      for (let i = 0; i < milei.width; i++) {
        p.push();

        const pixelIndex = (i + j * milei.width) * 4;
        const r = milei.pixels[pixelIndex + 0];
        const g = milei.pixels[pixelIndex + 1];
        const b = milei.pixels[pixelIndex + 2];
        const avg = (r + g + b) / 3;

        p.translate(
          (-milei.width * SPACE_BETWEEN_PIXELS) / 2,
          (-milei.height * SPACE_BETWEEN_PIXELS) / 2,
          -PIXEL_Z_AXIS_FACTOR * avg,
        );

        if (avg > 0) {
          p.textSize((PIXEL_SIZE / avg) * PIXEL_ZOOM_FACTOR + PIXEL_SIZE);
          p.textFont(font);
          p.fill(0);
          p.text(
            'a',
            i * SPACE_BETWEEN_PIXELS,
            j * SPACE_BETWEEN_PIXELS,
            (PIXEL_SIZE / avg) * PIXEL_ZOOM_FACTOR + PIXEL_SIZE,
            (PIXEL_SIZE / avg) * PIXEL_ZOOM_FACTOR + PIXEL_SIZE,
          );
        }
        p.pop();
      }
    }
  };

  p.draw = function () {
    drawFace();
    cam.setPosition(rotationX, 0, cameraDistance);
    cam.lookAt(0, 0, 0);
    console.log(p.frameRate());
  };

  const moveCamera = function (event) {
    event.preventDefault();

    // if (Math.abs(event.deltaY) < 10) return;
    cameraDistance -= event.deltaY * CANERA_DISTANCE_STEP;
    rotationX = Math.max(rotationX - event.deltaY * ROTATION_X_STEP, 0);
  };
}
