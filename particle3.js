// For attractor in Case 2: Invisible 

class Particle3 extends VerletParticle2D {
  constructor(x, y, r) {
    super(x, y);
    this.r = r;
    physics.addBehavior(new AttractionBehavior(this, r * 2, -2));
    physics.addParticle(this);
  }

  show() {
    fill(255);
    stroke(0);
    circle(this.x, this.y, this.r); // Draw 'invisible' circle 
  }
}
