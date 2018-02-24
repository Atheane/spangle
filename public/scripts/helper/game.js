define(['require','./background', './player', './bullet', './asteroid', './field', './collision', './skills', '../jquery'], function(require, Background, Player, Bullet, Asteroid, Field, Collision, Skills, $) {

  'use strict';

  var Game = function() {
    this.start1;
    this.start2;
    this.init = function() {

      this.bgCanvas = document.getElementById('background');
      this.playerCanvas = document.getElementById('player');
      this.mainCanvas = document.getElementById('main');

        // vérifier si canvas est bien supporté par le navigateur
      if (this.bgCanvas.getContext) {

        this.bgContext = this.bgCanvas.getContext('2d');
        this.bgContext.globalCompositeOperation = 'destination-over';

        this.mainContext = this.mainCanvas.getContext('2d');
        this.mainContext.globalCompositeOperation = 'destination-over';

        this.playerContext = this.playerCanvas.getContext('2d');

        this.bgCanvas.width  = window.innerWidth;
        this.bgCanvas.height = window.innerHeight;
        this.mainCanvas.width  = window.innerWidth;
        this.mainCanvas.height = window.innerHeight;
        this.playerCanvas.width  = window.innerWidth;
        this.playerCanvas.height = window.innerHeight;
        // on ajoute les propriétés manquantes à Background
        // utilisées dans la méthode draw
        Background.prototype.context = this.bgContext;
        Background.prototype.canvasWidth = this.bgCanvas.width;
        Background.prototype.canvasHeight = this.bgCanvas.height;

        Bullet.prototype.context = this.mainContext;
        Bullet.prototype.canvasWidth = this.mainCanvas.width;
        Bullet.prototype.canvasHeight = this.mainCanvas.height;

        Player.prototype.context = this.playerContext;
        Player.prototype.canvasWidth = this.playerCanvas.width;
        Player.prototype.canvasHeight = this.playerCanvas.height;

        Asteroid.prototype.context = this.mainContext;
        Asteroid.prototype.canvasWidth = this.mainCanvas.width;
        Asteroid.prototype.canvasHeight = this.mainCanvas.height;

        Field.prototype.context = this.mainContext;
        Field.prototype.canvasWidth = this.mainCanvas.width;
        Field.prototype.canvasHeight = this.mainCanvas.height;

        this.background = new Background;
        this.background.init(0,0,0,0);

        this.player = new Player;
        var playerX = this.playerCanvas.width/2-150;
        var playerY = Math.ceil(this.playerCanvas.height*0.8);
        this.player.init(playerX, playerY, 150, 150);

        this.field = new Field;

        this.collision = new Collision;

        this.skills = new Skills;
        this.skills.init();

        this.score = 0;
        this.over = false;
        this.finished = false;
        // this.lives = 3;

        return true;
      }
      else {
        return false;
      }
    };
    // Start the animation loop
    this.start = function() {
      gameLoop(0);
    };

  };

  var game = new Game();

  var skill = 'html';

  var gameLoop = function(timestamp) {
    if (!game.start1) { game.start1 = timestamp; }
    if (!game.start2) { game.start2 = timestamp; }

    // if more than 150 ms since last timestamp
    if (timestamp - game.start1 >= 25) {
      game.background.draw();
      game.player.shoot();
      game.player.packBullets.forEach(function(bullet) {
        if (bullet.active) {
          bullet.draw();
        }
      });
      game.start1 = timestamp;
    }

    if (timestamp - game.start2 >= 15) {
      game.player.draw();
      game.player.move();
      game.field.pooling();
      game.field.packAsteroids.forEach(function(asteroid, index, array) {
        asteroid.oldAsteroidStatus = asteroid.exploded;

        var collisionPlayer = game.collision.asteroid(game.player, asteroid);

        if (!game.collision.field(array, asteroid) && asteroid.active) {
          asteroid.draw();
          game.skills.updateCurrentSkill();
        }
        else {
          array.splice(index, 1);
        }

        if (collisionPlayer) {
          if (asteroid.active && asteroid.exploded === false) {
            game.player.explode();
            game.over = true;
          } else {
            // ninja technique to make draw disapear when the skill is collected
            game.skills.collectedSkills.push(asteroid.skill);
            game.score += 50;
            asteroid.explodeK = 9;
          }
        }

        // var bullet = game.player.packBullets[0];

        game.player.packBullets.forEach(function(bullet) {
          var collisionBullet = game.collision.asteroid(asteroid, bullet);
          if (bullet.active && collisionBullet) {
            asteroid.explode();
            bullet.active = false;
            asteroid.newAsteroidStatus = asteroid.exploded;
            if (asteroid.newAsteroidStatus !== asteroid.oldAsteroidStatus) {
              asteroid.skill = game.skills.currentSkill;
              game.skills.updateRemainingSkills();
            }
          }
        });

      });

      game.start2 = timestamp;
    }

    // method to manage collision between Player and borders of canvas
    game.collision.backgroundPlayer(game.player);

    if (game.skills.collectedSkills.filter(onlyUnique).length === 14) {
      game.finished = true;
    }

    if (game.skills.collectedSkills.filter(onlyUnique).length < 5 && !game.skills.currentSkill) {
      game.over = true;
    }


    $('.score').html("Score: " + game.score);
    $('#score-win').html("Score: " + game.score);
    $('#score-lost').html("Score: " + game.score);

    if (!game.over && !game.finished) {
      window.requestAnimationFrame(gameLoop);
    }
    else {
      if (game.over) {
        $('#game-over').show();
        $('#score-win').show();
        $('.score').hide();
      } else if (game.finished) {
        $('#game-finished').show();
        $('#score-lost').show();
        $('.score').hide();
      }
    }

  };

  return game;

});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

