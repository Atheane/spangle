define(['./image', './dessin', './asteroid'], function(image, Dessin, Asteroid) {

  'use strict';

  var Field = function() {
    this.packAsteroids = [];
    this.maxSize = 5;
  }

  Field.prototype.draw = function() {
    this.packAsteroids.forEach(function(asteroid) {
      asteroid.draw();
    });
  };

  Field.prototype.pooling = function() {
    var size = Math.ceil(getRandomInt(this.canvasWidth/24, this.canvasWidth/12));
    var x = Math.ceil(getRandomInt(this.canvasWidth/12, this.canvasWidth - size));
    var y = -Math.ceil(getRandomInt(this.canvasHeight/12, this.canvasHeight));
    if (this.packAsteroids.length < this.maxSize) {
      var asteroid = new Asteroid;
      asteroid.init(x, y, size, size);
      this.packAsteroids.unshift(asteroid);
    }
    else {
      var lastAsteroid = this.packAsteroids[this.packAsteroids.length-1];
      if (!lastAsteroid.active) {
        lastAsteroid.active = true;
        lastAsteroid.init(x, -lastAsteroid.height, size, size);
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




