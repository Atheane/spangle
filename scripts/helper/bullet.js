define(['./image', './dessin'], function(image, Dessin) {

  'use strict';

  var Bullet = function() {
    this.speed = 10;
    this.active = true;
  }

  var dessin = new Dessin;

  // heritage from Dessin constructor function (method init, canvasHeight and canvasWidth)
  Bullet.prototype = dessin;

  Bullet.prototype.draw = function() {
    // this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    this.context.clearRect(this.x, this.y, this.width, this.height);
    this.context.clearRect(this.x+44, this.y, this.width, this.height);
    this.y -= this.speed;
    if (this.y > 0 - this.height) {
      this.context.drawImage(image.bulletShort, this.x, this.y, this.width, this.height);
      this.context.drawImage(image.bulletShort, this.x+44, this.y, this.width, this.height);
    }
    else {
      this.active = false;
    }
  };

  return Bullet;

});
