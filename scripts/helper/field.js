define(['./image', './dessin', './asteroid'], function(image, Dessin, Asteroid) {

  'use strict';

  var Field = function() {
    this.pool = [];
    this.number = 0;
  }

  var dessin = new Dessin;

  // heritage from Dessin constructor function (method init, canvasHeight and canvasWidth)
  Field.prototype = dessin;

  Field.generatePool = function() {
    var size = this.width;
    // var x =
    // var y =
  }

  Field.prototype.draw = function() {

    this.context.clearRect(this.x, this.y, this.width, this.height);
    this.y += this.speed;

    this.pool.forEach(function(asteroid) {
      asteroid.draw();
    });

  };



  return Field;

});
