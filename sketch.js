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

// Design size the scene is drawn for; smaller windows scale it down
var DESIGN_WIDTH = 900
var scaleFactor = 1

function preload() {
  fontRegular = loadFont('assets/Oswald-Regular.ttf')
}

/**
 * Setup sketch
 * @return {Void}
 */
function setup() {
  createCanvas(windowWidth, windowHeight)
  buildScene()
  cursor(HAND)
}

/**
 * (Re)create tree & dragonCurve for the current window size.
 * Coordinates are in scaled space: the window size divided by scaleFactor
 * @return {Void}
 */
function buildScene() {
  scaleFactor = min(1, width / DESIGN_WIDTH)
  var w = width / scaleFactor
  var h = height / scaleFactor
  tree = new Tree(createVector(w / 2 + random(-100, 100) * scaleFactor, h))
  dragonCurve = new DragonCurve([w * .35, 210], [w * .65, 190], 8)
  dragonCurve.setup()
}

/**
 * Generate new Tree when mouse is pressed
 * @return {Void}
 */
function mousePressed() {
  buildScene()
}

/**
 * Resize canvas and rebuild the scene when window is resized
 * @return {Void}
 */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  buildScene()
}

/**
 * Update tree & draw background, dragonCurve & tree
 * @return {Void}
 */
function draw() {
  background('#eaeaea')
  scale(scaleFactor)
  dragonCurve.display()
  fill('#ccc').strokeWeight(0).textSize(20)
  textFont(fontRegular);
  text('Click mouse to create a new tree', 10, height / scaleFactor - 30)


  tree.update()
  tree.display()
}
