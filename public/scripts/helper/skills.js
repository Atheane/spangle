define([], function() {

  var Skills = function() {
  }

  Skills.prototype.init = function() {
    this.remainingSkills = ['html', 'css', 'js', 'jquery', 'angular', 'mongodb', 'node', 'express', 'ajax', 'meteor', 'ruby', 'ror', 'postgresql', 'python', 'd3', 'react', 'redux'];
    this.collectedSkills = [];
    this.currentSkill = this.remainingSkills[0];
  }

  Skills.prototype.updateCurrentSkill = function() {
    console.log("current " + this.currentSkill);
    this.currentSkill = this.remainingSkills[0];
  }

  Skills.prototype.updateRemainingSkills = function() {
    console.log("remaining " + this.remainingSkills);
    this.remainingSkills.shift();
  }

  Skills.prototype.updateCollectedSkills = function() {
    console.log("collected " + this.collectedSkills);
    this.collectedSkills.push(this.currentSkill);
  }

  return Skills;
});

