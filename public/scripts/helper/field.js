define(['./image', './dessin', './asteroid', './collision'], function(image, Dessin, Asteroid, Collision) {

  'use strict';

  var Field = function() {
    this.packAsteroids = [];
    this.maxSize = 5;
  }

  var dessin = new Dessin;

  Field.prototype = dessin;

  Field.prototype.draw = function() {

    var collision = new Collision;

    var that = this;
    this.packAsteroids.forEach(function(asteroid, index, array) {
      if (!collision.Field(array, asteroid) && asteroid.active) {
        asteroid.draw();
      }
      else {
        array.splice(index, 1);
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




