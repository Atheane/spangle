define(['./image', './dessin', './asteroid', './collision'], function(image, Dessin, Asteroid, Collision) {

  'use strict';

  var Field = function() {
    this.packAsteroids = [];
    this.maxSize = 5;
  }

  var dessin = new Dessin;

  Field.prototype = dessin;

  Field.prototype.draw = function() {
    this.packAsteroids.forEach(function(asteroid) {
      asteroid.draw();
    });
  };

  Field.prototype.pooling = function() {
    // we copy former version of the this.pachAsteroids by value
    var oldSample = Object.assign({}, this.packAsteroids);
    // we choose new coordinates for an upcoming asteroids
    var size = Math.ceil(getRandomInt(this.canvasWidth/24, this.canvasWidth/12));
    this.init( Math.ceil(getRandomInt(this.canvasHeight/12, this.canvasWidth-this.width)),
              -Math.ceil(getRandomInt(this.canvasHeight/12, this.canvasHeight-this.height)), size, size);
    var collision = new Collision;

    var noCollision = !collision.Field(oldSample, this);

    if (noCollision) {
      if (this.packAsteroids.length < this.maxSize) {
        var asteroid = new Asteroid;
        asteroid.init(this.x, this.y, this.width, this.height);
        this.packAsteroids.unshift(asteroid);
      }
      else {
        var lastAsteroid = this.packAsteroids[this.packAsteroids.length-1];
        if (!lastAsteroid.active) {
          lastAsteroid.active = true;
          lastAsteroid.init(this.x, -lastAsteroid.height, this.width, this.height);
          lastAsteroid = this.packAsteroids.pop();
          this.packAsteroids.splice(0, 0, lastAsteroid);
        }
      }
    }
    else {
      // if collision we recast the sample
      this.pooling();
    }

  }

  return Field;

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

});




