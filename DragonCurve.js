/**
 * Creates a dragonCurve (fractal)
 * https://en.wikipedia.org/wiki/Dragon_curve
 *
 * @constructor
 * @param {Array} pointA Start right coordinates
 * @param {Array} pointC Start left coordinates
 * @param {Number} steps Number of iterations
 */
function DragonCurve(pointA, pointC, steps) {
  this._paths = []

  /**
   * Recursively make fractals
   * @return {Void}
   */
  this.setup = function () {
    this._makeFractal(pointA, pointC, steps)
  }

  /**
   * Display fractal with the paths stored in _paths
   * @return {Void}
   */
  this.display = function () {
    this._paths.forEach(function (path) {
      stroke('rgba(255, 255, 255, 1)')
      line(path[0].x, path[0].y, path[1].x, path[1].y)
    })
  }

  /**
   * Make a fractal step, calls _recurse if condition is met,
   * otherwise store resulting vector in _paths
   *
   * @param {Array} pointA Start right coordinates
   * @param {Array} pointC Start left coordinates
   * @param {Number} steps Number of iterations
   * @return {Void}
   */
  this._makeFractal = function (pointA, pointC, steps) {
    if (steps > 1) {
      var pointB = this._growNewPoint(pointA, pointC, steps);
      this._recurse(pointA, pointB, pointC, steps)
    } else {
      this._paths.push([createVector(pointA[0], pointA[1]), createVector(pointC[0], pointC[1])])
    }
  }

  /**
   * Returns new point based on start left & start right points
   * @param {Array} pointA Start right coordinates
   * @param {Array} pointC Start left coordinates
   * @return {Array} pointB Middle coordinates
   */
  this._growNewPoint = function (pointA, pointC) {
    var transform  = [[ 1/2,-1/2 ],
                      [ 1/2, 1/2 ]]

    return this._matrix.plus(pointA, this._matrix.mult(transform, this._matrix.minus(pointC, pointA)));
  }

  /**
   * Calls _makeFractal twice, once goiing to left, once going through right
   *
   * @param {Array} pointA Start right coordinates
   * @param {Array} pointB Middle coordinates
   * @param {Array} pointC Start left coordinates
   * @param {Number} steps Number of iterations
   * @return {Void}
   */
  this._recurse = function (pointA, pointB, pointC, steps) {
    this._makeFractal(pointB, pointA, steps - 1)
    this._makeFractal(pointB, pointC, steps - 1)
  }

  /**
   * Matrix transformation methods
   * @type {Object}
   */
  this._matrix = {
    // Multiply
    mult: function ( m, v ) {
       return [ m[0][0] * v[0] + m[0][1] * v[1],
                m[1][0] * v[0] + m[1][1] * v[1] ];
    },

    // Subtract
    minus: function ( a, b ) {
       return [ a[0]-b[0], a[1]-b[1] ];
    },

    // Add
    plus: function ( a, b ) {
       return [ a[0]+b[0], a[1]+b[1] ];
    }
  }
}
