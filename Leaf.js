/**
 * Leaf on end of branches in the tree
 * Leafs will have forces applied to them when isFalling is true
 * This will mimic the leaf falling to the ground
 *
 * @constructor
 * @param {p5.Vector} position Position of leaf
 */
function Leaf(position) {
  var colors         = ['#E80048', '#FA8497', '#FFBEBD']
  this.position      = position
  this.position.x    = this.position.x + random(-30, 30)
  this.position.y    = this.position.y + random(-30, 30)
  this._leafSize     = random(2, 12)
  this.mass          = (this._leafSize + 10) * 6
  this._fill         = shuffle(colors)[0]
  this._velocity     = createVector(0, 0)
  this._acceleration = createVector(0, 0)
  this.isFalling     = false

  /**
   * Update position of leaf each tick
   * position = position + velocity + acceleration
   * @return {Void}
   */
  this.update = function () {
    this.position = this.position.add(this._velocity.add(this._acceleration))
    this._acceleration.mult(0)
  }

  /**
   * Apply forces to leaf
   * 2nd law of newton
   * @param  {p5.Vector} force Force to be applied
   * @return {Void}
   */
  this.applyForce = function(force) {
    var f = p5.Vector.div(force, this.mass)
    this._acceleration.add(f)
  }

  /**
   * Display leaf with fill, position & size
   * @return {Void}
   */
  this.display = function () {
    fill(this._fill)
    noStroke()
    ellipse(this.position.x, this.position.y, this._leafSize, this._leafSize)
  }
}
