
define(['./image','./dessin', './key'], function(image, Dessin, key) {

  'use strict';

  var Player = function() {
    this.speed = 25;
    // this.acceleration = 1.3;
    this.i = 1;
    this.j = 0;
  };

  var dessin = new Dessin();

  Player.prototype = dessin;

  Player.prototype.draw = function() {

    var boundariesX = [0, 2048, 4096];
    var boundariesY = [0, 2048, 4096, 6144];

    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.context.drawImage(image.player, boundariesX[this.i], boundariesY[this.j], image.player.width/boundariesX.length, image.player.height/boundariesY.length, this.x, this.y, this.width, this.height);
   };

  Player.prototype.move = function() {
    if (key.leftPressed) {
      this.x -= this.speed;
      (this.i > 0) ? this.i-=1 : this.i=0;
    }
    else if (key.rightPressed) {
      this.x += this.speed;
      (this.i < 2) ? this.i+=1 : this.i=2;
    }
    if (key.upPressed) {
      this.y -= this.speed;
    }
    else if (key.downPressed) {
      this.y += this.speed ;
    }
  };

  Player.prototype.shoot = function() {
    if (key.mitraillettePressed && !key.roquettePressed) {
      this.j = 1;
    }
    else if (!key.mitraillettePressed && key.roquettePressed) {
      this.j = 2;
    }
    else if (key.mitraillettePressed && key.roquettePressed) {
      this.j = 3;
    }
    else {
      this.j = 0;
    }
  };

  return Player;

});
