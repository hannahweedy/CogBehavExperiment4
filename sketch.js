let angle = [5, 15, 1, 12.5 , 12, 5, 4, 1];  // Angles of branches
let trunkLengths = [336, 504, 756, 48, 252, 72, 48, 168];  // Initial trunk length
let lean = [66, 100, 87.5, 93.4, 66, 50, 90, 90];  // Lean angles
let jitterAmounts = [0.8, 1, 0.3, 0.9, 0.6, 0.8, 0.9, 1]; // Jitter
let angleControl = [4, 4, 3, 28, 6, 5, 2, 5]; // Controls branch angle offset
let colour = [
  [255, 84, 71], [125, 208, 219], 
  [191, 222, 91], [92, 76, 85],
  [90, 103, 196], [255, 162, 0],
  [222, 227, 211], [247, 0, 255]
];  // Colors for the tree

let i = 0;  // Index for controlling tree parameters
let growthRate = 2;  // Rate at which the tree grows each frame
let maxGrowth = 800; // Maximum growth for the trunk length
let currentGrowth = 0; // Tracks the current growth of the tree

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
}

function draw() {
  background(255, 100);
  strokeWeight(1);
  stroke(255);
  
  // Fetch the trunk length for the current tree, growing it each frame
  let trunkLength = trunkLengths[i] + currentGrowth;  
  let leanControl = lean[i];
  let jitter = jitterAmounts[i];
  let angleOffset = angleControl[i];

  translate(width / 2, height);  // Set origin to bottom center

  // Draw the tree with the current trunk length and other parameters
  branch(trunkLength, leanControl, angleOffset, jitter, 0);  

  // Increase the current growth until it reaches the maxGrowth
  if (currentGrowth < maxGrowth) {
    currentGrowth += growthRate;  // Gradually increase the growth
  }
}

function branch(length, leanControl, angleOffset, jitter, depth) {
  // Calculate mapped angle and adjustments for branching
  let mappedAngle = map(angle[i] + random(-jitter, jitter), 0, 100, -45, 45);  
  let adjustedAngleRight = mappedAngle + leanControl;
  let adjustedAngleLeft = -mappedAngle + leanControl;

  // Use the fixed color from the colour array
  stroke(colour[i]);  // Set the stroke color

  // Draw the branch
  line(0, 0, 0, -length);
  translate(0, -length);

  if (length > 20) {  // Stop branching if the branch is too small
    push();
    rotate(radians(adjustedAngleRight + angleOffset));
    branch(length * 0.67, leanControl, angleOffset, jitter, depth + 1);  // Right sub-branch
    pop();

    push();
    rotate(radians(adjustedAngleLeft - angleOffset));
    branch(length * 0.67, leanControl, angleOffset, jitter, depth + 1);  // Left sub-branch
    pop();
  }
}

function mousePressed() {
  // Cycle through tree properties when mouse is pressed
  i = (i + 1) % angle.length;

  // Reset growth to simulate a new tree with the initial parameters
  currentGrowth = 0;

  console.log("TREE PROPERTIES");
  console.log("Trunk Length: " + trunkLengths[i]);
  console.log("Branch Angle: " + angle[i]);
  console.log("Branch Lean: " + lean[i]);
  console.log("Branch Color: " + colour[i]);
  console.log("Jitter Amount: " + jitterAmounts[i]);
  console.log("Angle Offset: " + angleControl[i]);
}
