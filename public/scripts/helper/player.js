
define(['./image','./dessin', './key', './bullet'], function(image, Dessin, key, Bullet) {

  'use strict';

  var Player = function() {
    this.speed = 25;
    // this.acceleration = 1.3;
    this.i = 1;
    this.j = 0;
    this.packBullets = [];
    this.maxSize = 50;
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

    // this.collideBackground();

  };

  Player.prototype.pooling = function() {
    if (this.packBullets.length === 0) {
      var bullet = new Bullet;
      bullet.init(this.x+46, this.y+4, 5, 10);
      this.packBullets.unshift(bullet);
    }
    else {
      var lastBullet = this.packBullets[this.packBullets.length-1];
      if (lastBullet.active) {
        var bullet = new Bullet;
        bullet.init(this.x+46, this.y+4, 5, 10);
        this.packBullets.unshift(bullet);
      }
      else {
        lastBullet = this.packBullets.pop();
        lastBullet.init(this.x+46, this.y+4, 5, 10);
        lastBullet.active = true;
        this.packBullets.splice(0, 0, lastBullet);
      }
    }
  }


  Player.prototype.shoot = function() {
    if (key.mitraillettePressed && !key.roquettePressed) {
      this.j = 1;
      this.pooling();
    }
    else if (!key.mitraillettePressed && key.roquettePressed) {
      this.j = 2;
    }
    else if (key.mitraillettePressed && key.roquettePressed) {
      this.j = 3;
      this.pooling();
    }
    else {
      this.j = 0
    }
  };

  return Player;

});
