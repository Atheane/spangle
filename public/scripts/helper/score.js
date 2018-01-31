define(['./image', './dessin', './collision'], function(image, Dessin, Collision) {

  'use strict';

  var Score = function() {
    this.totalScore = 0;
    this.pause = true;
    this.gameover = false;
    this.lives = 3;
  }

  Score.prototype.computeScore = function() {
    this.totalScore += 100;
  };

  Score.prototype.computeLives = function() {
    this.lives -= 1
  }

  Score.prototype.gameover = function() {
    if (this.lives === 0) {
      this.gameover = true;
    }
  }

  // Score.prototype.displayScore = function() {

  // }

  return Score;

});



