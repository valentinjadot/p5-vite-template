const SPACE_BETWEEN_PIXELS = 24;
const PIXEL_SIZE = 24;
const CAMERA_DISTANCE = 2000;

const PIXEL_Z_AXIS_FACTOR = 3;
const PIXEL_ZOOM_FACTOR = 10;

export function sketch(p) {
  let milei;
  let bombita;
  let canvas;
  let cam;
  let zoom = 0;

  p.setup = function () {
    milei = p.loadImage('cropped-75.png');
    bombita = p.loadImage('bomb.svg');
    canvas = p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    cam = p.createCamera();

    // Place the camera at the top-center.
    cam.setPosition(0, 0, CAMERA_DISTANCE);

    // Point the camera at the origin.
    cam.lookAt(0, 0, 0);
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
          p.image(
            bombita,
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
    zoom -= 10;
    cam.setPosition(0, 0, CAMERA_DISTANCE + zoom);
  };
}
