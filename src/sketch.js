export function sketch(p) {
  let canvas;

  p.preload = function () {};

  p.setup = function () {
    canvas = p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
  };

  p.draw = function () {
    p.background(0);
    p.rotateX(p.frameCount * 0.01);
    p.rotateY(p.frameCount * 0.01);
    p.box(100);
  };
}
