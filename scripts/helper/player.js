
define(['./image'], function(image) {

  'use strict';

  var Player = function() {
    this.speed = 25;
    // this.acceleration = 1.3;
    this.i = 1;
    this.j = 0;
    this.leftPressed = false;
    this.upPressed = false;
    this.rightPressed = false;
    this.downPressed = false;
    this.mitraillettePressed = false;
    this.roquettePressed = false;
  };

  Player.prototype.init = function(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  };

  Player.prototype.draw = function() {
    var boundariesX = [0, 2048, 4096];
    var boundariesY = [0, 2048, 4096, 6144];

    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.context.drawImage(image.player, boundariesX[this.i], boundariesY[this.j], image.player.width/boundariesX.length, image.player.height/boundariesY.length, this.x, this.y, this.width, this.height);
   };

  Player.prototype.move = function() {
    if (this.leftPressed) {
      this.x -= this.speed;
      (this.i > 0) ? this.i-=1 : this.i=0;
    }
    else if (this.rightPressed) {
      this.x += this.speed;
      (this.i < 2) ? this.i+=1 : this.i=2;
    }
    if (this.upPressed) {
      this.y -= this.speed;
    }
    else if (this.downPressed) {
      this.y += this.speed ;
    }
  };

  Player.prototype.shoot = function() {
    if (this.mitraillettePressed && !this.roquettePressed) {
      this.j = 1;
    }
    else if (!this.mitraillettePressed && this.roquettePressed) {
      this.j = 2;
    }
    else if (this.mitraillettePressed && this.roquettePressed) {
      this.j = 3;
    }
    else {
      this.j = 0;
    }
  };

  return Player;

});
