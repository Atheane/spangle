


define(['./image', './dessin', './skills'], function(image, Dessin, skills) {

  'use strict';

  var Asteroid = function() {
    this.speed = 5;
    this.active = true;
    this.explodeI = 0;
    this.explodeJ = 0;
    this.explodeK = 0;
    this.exploded = false;
    // this.skill = skills.skills[0];
    this.oldAsteroidStatus = false;
    this.newAsteroidStatus = false;
  }

  var dessin = new Dessin;

  // heritage from Dessin constructor function (method init, canvasHeight and canvasWidth)
  Asteroid.prototype = dessin;

  Asteroid.prototype.draw = function(skill) {

    this.context.clearRect(this.x, this.y, this.width, this.height);
    this.y += this.speed;

    var boundariesX = [0, 600, 1200];
    var boundariesY = [0, 500];
    var boundariesExplosion = [0, 208, 417, 625, 833, 1041, 1264, 1473, 1681];

    if (this.y < this.canvasHeight && (this.explodeI !== 2 || this.explodeJ !== 1)) {
      this.context.drawImage(image.asteroid, boundariesX[this.explodeI], boundariesY[this.explodeJ], Math.ceil(image.asteroid.width/3), Math.ceil(image.asteroid.height/2), this.x, this.y, this.width, this.height);
    } else if (this.y < this.canvasHeight && this.explodeI === 2 && this.explodeJ === 1 && this.explodeK < 8) {
      this.context.drawImage(image.explosion, boundariesExplosion[this.explodeK], 0, image.explosion.width/9, image.explosion.height, this.x, this.y, this.width, this.height);
      this.explodeK += 1;
    } else if (this.y < this.canvasHeight && this.explodeI === 2 && this.explodeJ === 1 && this.explodeK === 8) {
      if (skill) {
        this.context.drawImage(image[skill], this.x, this.y, this.width, image[skill].height * this.width / image[skill].width);
      }
    }
    else {
      this.active = false;
      this.explodeI = 0;
      this.explodeJ = 0;
      this.explodeK = 0;
     }
  };

  Asteroid.prototype.explode = function() {

    if (this.explodeI < 2 && this.explodeJ === 0) {
      this.explodeI += 1;
      this.explodeJ = 0;
    }
    else if (this.explodeI === 2 && this.explodeJ === 0) {
      this.explodeI = 0;
      this.explodeJ = 1;
    }
    else if (this.explodeI < 2 && this.explodeJ === 1) {
      this.explodeI += 1;
    }
    else {
      this.exploded = true;
    }

  };

  return Asteroid;

});
