import p5 from 'p5';

class Base {
  static p: p5;
  p: p5;

  static init(p: p5) {
    Base.p = p;
  }

  static createFullScreenCanvas() {
    Base.p.createCanvas(Base.p.windowWidth, Base.p.windowHeight);
  }

  constructor() {
    this.p = Base.p;
  }
}
export default Base;
