define(['./image', './dessin', './asteroid', './collision'], function(image, Dessin, Asteroid, Collision) {

  'use strict';

  var Field = function() {
    this.packAsteroids = [];
    this.maxSize = 5;
  }

  var dessin = new Dessin;

  Field.prototype = dessin;

  Field.prototype.draw = function() {

    // we copy former version of the this.pachAsteroids by value
    // var temp = Object.assign({}, this);
    // var oldSample = temp.packAsteroids;
    // we choose new coordinates for an upcoming asteroids

    var collision = new Collision;

    // console.log(collision.Field(oldSample, this));
    // var that = this;

    this.packAsteroids.forEach(function(asteroid, index, array) {
      // console.log(asteroid, array);
      if (!collision.Field(array, asteroid)) {
        asteroid.draw();
      }
      else {
        asteroid.init(0,0,0,0);
      }
    });
  };

  Field.prototype.pooling = function() {
    var size = Math.ceil(getRandomInt(this.canvasWidth/24, this.canvasWidth/12));
    this.init( Math.ceil(getRandomInt(this.canvasHeight/12, this.canvasWidth-this.width)),
              -Math.ceil(getRandomInt(this.canvasHeight/12, this.canvasHeight-this.height)), size, size);

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

  return Field;

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

});



