define(['./image', './dessin', './asteroid'], function(image, Dessin, Asteroid) {

  'use strict';

  var Field = function() {
    this.pool = [0,0,0,0,0,0,0,0,0,0,0,0];
    this.number = 5;
    this.speed = 1;
  }

  var dessin = new Dessin;

  // heritage from Dessin constructor function (method init, canvasHeight and canvasWidth)
  Field.prototype = dessin;



  Field.prototype.generatePool = function() {

    for (var i = 0; i < this.number; i++) {
      var rank = getRandomInt(0,12);
      this.pool[rank] = 1;
    }

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

  }

  Field.prototype.draw = function() {

    this.context.clearRect(this.x, this.y, this.width, this.height);
    this.y += this.speed;

    for (var i = 0; i < this.pool.length; i++) {
        if (this.pool[i]) {
          var asteroid = new Asteroid;
          var size = 150;
          asteroid.init(this.x*i/12, -size, size, size);
          asteroid.draw();
        }
      };
    }

  return Field;

});


