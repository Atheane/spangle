define(['./image', './dessin', './collision'], function(image, Dessin, Collision) {

  'use strict';

  var Score = function() {
    this.totalScore = 0;
    this.pause = true;
    this.gameover = true;
    this.lives = 3;
  }

  Score.prototype.computeScore = function() {

  };

  Score.prototype.computeLives = function() {

  }

  return Score;

});



