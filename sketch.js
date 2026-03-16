/* Expand/contract
  Switching between scenes using Switch case on mouse press:
    0. Just circle
    1. Expanding: expanding central particle circle and new ones starting at mouse position
    2. Invisible/dark matter: particles are attracted to an invisible object
*/

// Track which scene we are on using sceneNum, initialise to 0
let sceneNum = 0;

// Variables for Case 1 Expanding particles
let ps = [];
let stopParts = 0;

// For Case 2 Invisible/dark matter
let { Vec2D, Rect } = toxi.geom;
let { VerletPhysics2D, VerletParticle2D } = toxi.physics2d;
let { AttractionBehavior } = toxi.physics2d.behaviors;
// Reference to physics world:
let physics;
let particles3 = [];
let attractor;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // For case 2 Invisible
  // Initialize the physics
  physics = new VerletPhysics2D();
  physics.setWorldBounds(new Rect(0, 0, windowWidth, windowHeight));
  physics.setDrag(0.01);

  for (let i = 0; i < 500; i++) {  // Fill case 2 particles array
    particles3.push(
      new Particle3(random(windowWidth), random(windowHeight), 4)
    );
  }
  // Set the (invisible) attractor
  attractor = new Attractor(windowWidth / 2, windowHeight / 2, 50);
}

function draw() {
  background(0);

  // Full screen on mouse click
  function mouseClicked() {
    if (!fullscreen()) {
      fullscreen(true);
    } else {
      fullscreen(false);
    }
  }

  // Inside the parentheses, put the variable that's tracking which switch "case" we're on.
  switch (sceneNum) {
    case 0:
      neutral(); // Draws centre circle only
      break; // stop here & exit case 0

    case 1:
      expanding(); // Expanding particles
      break; // stop here and exit case 1

    case 2:
      invisible(); // Particles attracted to invisible object
      break; // stop here & exit case 2
  }
}

// increment sceneNum variable on each mouse press, moving to next switch case/scene:
function mousePressed() {
  sceneNum++;
  // When sceneNum is incremented to cases + 1, start back at case 0
  if (sceneNum == 3) {
    sceneNum = 0;
  }
}

// For Case 0 - Static circle 

function neutral() {
  fill(255);
  ellipse(windowWidth / 2, windowHeight / 2, 10, 10);
}

// Case 1: expanding central particle circle and new ones starting at mouse position

function expanding() {
  background(0);

  // Start a new particle system at mouse position
  if (abs(pmouseX - mouseX) > 0 || abs(pmouseY - mouseY) > 0) {
    ps.push(new System(mouseX, mouseY));
  }

  // Create the central particle system
  if (stopParts == 0) {
    ps.push(new System(windowWidth / 2, windowHeight / 2));

    for (let i = ps.length - 1; i >= 0; i--) {
      ps[i].update();
      ps[i].display();

      if (ps[i].done) {
        ps.splice(i, 1);
      }
    }
  }

}

// Case 2 Invisible Objects/dark matter: particles are attracted to an invisible object
function invisible() {
  particles3.push(new Particle3(random(windowWidth), random(windowHeight), 4));

  // Update the physics world
  physics.update();

  attractor.show();  // Show the attractor and particles
  for (let particle of particles3) {
    particle.show();
  }
}

function keyPressed() {  // Toggle full screen
  console.log("f key");
  //toggle fullscreen on or off
  if (key == "f") {
    //get current full screen state https://p5js.org/reference/#/p5/fullscreen
    let fs = fullscreen();

    //switch it to the opposite of current value
    fullscreen(!fs);
  }
  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }
}

function keyTyped() {
  // On Chrome/Mac you may have to press f twice to toggle. Works correctly on Firefox/Mac
  if (key === "f") {
    toggleFullscreen();
  }
 
}

// Toggle fullscreen state. Must be called in response
// to a user event (i.e. keyboard, mouse click)
function toggleFullscreen() {
  let fs = fullscreen(); // Get the current state
  fullscreen(!fs); // Flip it!
}
