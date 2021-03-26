/**
 * Tree, consists of branches & leaves
 * @constructor
 * @param {p5.vector} start Start position
 */
function Tree(start) {
  this._start     = start
  this._branches  = []
  this._leaves    = []
  this._angle     = -1.57
  this._thickness = 25

  /**
   * Call display on leaves and branches
   * @return {Void}
   */
  this.display = function () {
    this._branches.forEach(function (branch) {
      branch.display()
    })
    this._leaves.forEach(function (leave) {
      leave.display()
    })
  }

  /**
   * Update tree each tick
   * @return {Void}
   */
  this.update = function () {
    // Keep track of number of growing branches
    var isGrowingCount = 0
    this._branches.forEach(function (branch) {
      if (branch.isGrowing) {
        isGrowingCount++
        // If branch is growing _updateGrowingBranch
        this._updateGrowingBranch(branch)
      }
    }.bind(this))

    // If no branches are growing, at random intervals release a leave
    if (isGrowingCount === 0) {
      if(round(random(1, 2)) === 2) {
        var fallingLeaf = shuffle(this._leaves)[0]
        if (!fallingLeaf.isFalling) {
          // Apply some gravity to falling leaf
          var gravity = createVector(0, 3.8 * fallingLeaf.mass)
          fallingLeaf.isFalling = true
          fallingLeaf.applyForce(gravity)
        }
      }
    }
    // Apply wind to falling leaves
    this._applyWindToFallingLeaves()
  }

  /**
   * Update each growing branch: divaricate & add leaves when necessary
   * @param  {Branch} branch Branch to update
   * @return {Void}
   */
  this._updateGrowingBranch = function (branch) {
    branch.update()
    // Check wether the branch needs to divaricate
    var divaricate = round(random(0, branch.thickness / 1.8)) === 1

    // Only divaricate when there's less than 1000 branches
    // The more we add, the lesser performance is
    if (divaricate && this._branches.length < 1000) {
      var angle = branch.angle + random(-1, 1)
      var thickness = random(1, branch.thickness)
      this._createBranch(branch.start, angle, thickness)
    }

    // Add leaves to branch
    if (branch.thickness < 4) {
      this._leaves.push(new Leaf(branch.start.copy()))
    }
  }

  /**
   * Create a new branch
   * @param  {p5.Vector} start     [description]
   * @param  {Number}    angle     Angle of branch
   * @param  {Number}    thickness Thickness of branch in pixels
   * @return {Void}
   */
  this._createBranch = function (start, angle, thickness) {
    this._branches.push(new Branch(start, createVector(0, random(-0.5, 0.5)), angle, thickness))
  }

  /**
   * Apply random force to leaves to simulate wind
   * @return {Void}
   */
  this._applyWindToFallingLeaves = function () {
    this._leaves.forEach(function (leaf) {
      if (leaf.isFalling) {
        var pNoise = noise(leaf.position.x, leaf.position.y)
        var wind = createVector((pNoise * 100) - 42, 0)
        leaf.applyForce(wind)
      }
      leaf.update()
    })
  }

  // Create trunk
  this._createBranch(this._start, this._angle, this._thickness)
}
