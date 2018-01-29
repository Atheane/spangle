define(['./image', './dessin'], function(image, Dessin) {

  'use strict';

  var Asteroid = function() {
    this.speed = 1;
    this.active = true;
  }

  var dessin = new Dessin;

  // heritage from Dessin constructor function (method init, canvasHeight and canvasWidth)
  Asteroid.prototype = dessin;

  Asteroid.prototype.draw = function() {

    this.context.clearRect(this.x, this.y, this.width, this.height);
    this.y += this.speed;
    if (this.y < 0 - this.height) {
      // console.log(called);
      this.context.drawImage(image.asteroid, 0, 0, image.asteroid.width/3, image.asteroid.height/2, this.x, this.y, this.width, this.height);
    }
    else {
      this.active = false;
    }
  };

  return Asteroid;

});
