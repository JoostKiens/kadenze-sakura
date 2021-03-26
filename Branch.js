/**
 * Tree branch
 *
 * @constructor
 * @param {p5.Vector} start     Start position of branch
 * @param {p5.Vector} velocity  Velocity of growing branch
 * @param {Number}    angle     Angle of branch in relation to canvas
 * @param {Numbe}     thickness Thickness of branch in pixels
 */
function Branch(start, velocity, angle, thickness) {
  this.start     = start.copy()
  this.velocity  = velocity.copy()
  this.angle     = angle
  this.thickness = thickness
  this.isGrowing = true

  this._lines = []
  this._end   = this.start.copy()

  /**
   * Update branch each tick
   * @return {Void}
   */
  this.update = function () {
    this.start      = this._end
    this.thickness -= 0.3 // Reduce thickness
    this.angle     += PI / 180 * random(-15, 15) // Modify angle
    this._end       = this._getEnd(this.start)

    this._end.add(this.velocity)

    if (this.thickness < 1.2) this.isGrowing = false

    this._lines.push({
      strokeWeight: this.thickness,
      line: [this.start.x, this.start.y, this._end.x, this._end.y]
    })
  }

  /**
   * Get end position of branc
   * @param  {p5.Vector} start Start position of branch
   * @return {p5.vector}       End position of branch
   */
  this._getEnd = function (start) {
    var length = random(7, 18)
    var end = start.copy()
    end.x += length * cos(this.angle)
    end.y += length * sin(this.angle)

    return end
  }

  /**
   * Display the lines that make up the branch
   * @return {Void}
   */
  this.display = function () {
    noFill()
    stroke('#3F0000')
    this._lines.forEach(function (l) {
      strokeWeight(l.strokeWeight)
      line(l.line[0], l.line[1], l.line[2], l.line[3])
    })
  }
}
