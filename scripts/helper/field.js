define(['./image', './dessin', './asteroid'], function(image, Dessin, Asteroid) {

  'use strict';

  var Field = function() {
    this.packAsteroids = [];
    this.maxSize = 30;
  }

  var dessin = new Dessin;

  // heritage from Dessin constructor function (method init, canvasHeight and canvasWidth)
  Field.prototype = dessin;

  Field.prototype.draw = function() {

    this.packAsteroids.forEach(function(asteroid) {
      asteroid.draw();
    });

  };

  Field.prototype.pooling = function() {
    var asteroid = new Asteroid;
    var size = Math.ceil(getRandomInt(this.canvasWidth/24, this.canvasWidth/12));
    var x = Math.ceil(getRandomInt(this.canvasWidth/12, this.canvasWidth));
    var y = -Math.ceil(getRandomInt(this.canvasHeight/12, 4*this.canvasHeight));
    if (this.packAsteroids.length < this.maxSize) {
      asteroid.init(x, y, size, size);
      this.packAsteroids.push(asteroid);
    }
    else {
      var lastAsteroid = this.packAsteroids[this.packAsteroids.length-1];
      if (lastAsteroid.active) {
        this.packAsteroids.unshift(asteroid);
      }
      else {
        lastAsteroid = this.packAsteroids.pop();
        lastAsteroid.active = true;
        this.packAsteroids.splice(0, 0, lastAsteroid);
      }
    }
  }
  return Field;

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

});




