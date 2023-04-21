import p5 from 'p5';
import Base from './Base';

export function sketch(p: p5) {
  Base.init(p);
  let x = 100;
  let y = 100;

  p.setup = function () {
    Base.createFullScreenCanvas();
  };

  p.draw = function () {
    p.background(0);
    p.fill(255);
    p.rect(x, y, 50, 50);
  };
}
