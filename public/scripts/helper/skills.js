define([], function() {

  'use strict';

  var Skills = function() {
  }

  Skills.prototype.init = function() {
    this.remainingSkills = ['html', 'css', 'js', 'jquery', 'angular', 'mongodb', 'node', 'express', 'ajax', 'meteor', 'ruby', 'ror', 'postgresql', 'python', 'd3', 'react', 'redux'];

    this.collectedSkills = [];
    this.currentSkill = 'html';
  }

  Skills.prototype.updateCurrentSkill = function() {
    this.currentSkill = this.remainingSkills[0];
  }

  Skills.prototype.updateRemainingSkills = function() {
    this.remainingSkills.shift();
  }

  Skills.prototype.updateCollectedSkills = function() {
    this.collectedSkills.push(this.currentSkill);
  }

  return Skills;
});

