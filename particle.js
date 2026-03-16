class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = p5.Vector.random2D();
    this.acc.mult(0.05);
    
    this.life = 255;
    this.done = false;
    this.hueValue = 0;
  }
  
  update() {
    this.finished(); 
   // console.log('particle.js'); // ****************
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    
    this.life -= 3;
    
    if (this.hueValue > 255) {
      this.hueValue = 0;
    }
    this.hueValue += 1;
  }
  
  display() {  // Display particles
    noStroke();
   // fill(255, this.life);  // Fade as expand
    fill(255);  
    ellipse(this.pos.x, this.pos.y, 3, 3);
  }
  
  finished() {
    if (this.life < 0) {
      this.done = true;
    } else {
      this.done = false;
    }
  }
}