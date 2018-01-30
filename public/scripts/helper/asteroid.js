
define(['./image', './dessin'], function(image, Dessin) {

  'use strict';

  var Asteroid = function() {
    this.speed = 5;
    this.active = true;
    this.explodeX = 0;
    this.explodeY = 0;
  }

  var dessin = new Dessin;

  // heritage from Dessin constructor function (method init, canvasHeight and canvasWidth)
  Asteroid.prototype = dessin;

  Asteroid.prototype.draw = function() {

    this.context.clearRect(this.x, this.y, this.width, this.height);
    this.y += this.speed;
    if (this.y < this.canvasHeight) {
      this.context.drawImage(image.asteroid, this.explodeX, this.explodeY, Math.ceil(image.asteroid.width/3), Math.ceil(image.asteroid.height/2), this.x, this.y, this.width, this.height);
    }
    else {
      this.active = false;
    }
  };

  Asteroid.prototype.explode = function() {

    (this.explodeX < Math.ceil(image.asteroid.width*2/3) ) ? this.explodeX += image.asteroid.width/3 : this.explodeX = 1200;
    (this.explodeY !==  Math.ceil(image.asteroid.height* 0.5)) ? this.explodeY += image.asteroid.height*0.5 : this.explodeY = 500;

  };

  return Asteroid;

});
