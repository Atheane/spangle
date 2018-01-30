
define(['./image', './dessin'], function(image, Dessin) {

  'use strict';

  var Asteroid = function() {
    this.speed = 5;
    this.active = true;
    this.explodeI = 0;
    this.explodeJ = 0;
  }

  var dessin = new Dessin;

  // heritage from Dessin constructor function (method init, canvasHeight and canvasWidth)
  Asteroid.prototype = dessin;

  Asteroid.prototype.draw = function() {

    this.context.clearRect(this.x, this.y, this.width, this.height);
    this.y += this.speed;

    var boundariesX = [0, 600, 1200];
    var boundariesY = [0, 500];

    if (this.y < this.canvasHeight) {
      this.context.drawImage(image.asteroid, boundariesX[this.explodeI], boundariesY[this.explodeJ], Math.ceil(image.asteroid.width/3), Math.ceil(image.asteroid.height/2), this.x, this.y, this.width, this.height);
    }
    else {
      this.active = false;
    }
  };

  Asteroid.prototype.explode = function() {

    if (this.explodeI < 2 && this.explodeJ === 0) {
      this.explodeI +=1;
      this.explodeJ = 0;
    }
    else if (this.explodeI === 2 && this.explodeJ === 0) {
      this.explodeI = 0;
      this.explodeJ = 1;
    }
    else if (this.explodeI < 2 && this.explodeJ === 1) {
      this.explodeI += 1;
    }

  };

  return Asteroid;

});
