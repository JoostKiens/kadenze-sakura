/**
 * A self-similar, self generating tree.
 * Loosely based on the work by my coworker Idlework
 * https://github.com/idlework/generative-tree
 *
 * After the tree stops growing, leaves start to fall
 * and have wind forces applied to them
 *
 * In the background is a dragonCurve fractal
 * https://en.wikipedia.org/wiki/Dragon_curve
 * Inspired by https://github.com/killerswan/dragons
 */

var tree
var dragonCurve

function preload() {
  fontRegular = loadFont('assets/Oswald-Regular.ttf')
}

/**
 * Setup sketch
 * @return {Void}
 */
function setup() {
  createCanvas(windowWidth, windowHeight)
  // Tree
  tree = new Tree(createVector(width / 2 + random(-100, 100), height))
  // DragonCurve
  dragonCurve = new DragonCurve([width * .35, 210], [width * .65, 190], 8)
  dragonCurve.setup()
  cursor(HAND)
}

/**
 * Generate new Tree when mouse is pressed
 * @return {Void}
 */
function mousePressed() {
  tree = new Tree(createVector(width / 2 + random(-100, 100), height))
}

/**
 * Resize canvas when window is resized
 * @return {Void}
 */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

/**
 * Update tree & draw background, dragonCurve & tree
 * @return {Void}
 */
function draw() {
  background('#eaeaea')
  dragonCurve.display()
  fill('#ccc').strokeWeight(0).textSize(20)
  textFont(fontRegular);
  text('Click mouse to create a new tree', 10, height - 30)


  tree.update()
  tree.display()
}
