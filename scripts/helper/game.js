define(['require','./background', './player', './bullet', './asteroid'], function(require, Background, Player, Bullet, Asteroid) {

  'use strict';

  var Game = function() {
    this.init = function() {

      this.bgCanvas = document.getElementById('background');
      this.playerCanvas = document.getElementById('player');
      this.mainCanvas = document.getElementById('main');

        // vérifier si canvas est bien supporté par le navigateur
      if (this.bgCanvas.getContext) {

        this.bgContext = this.bgCanvas.getContext('2d');
        this.bgContext.globalCompositeOperation = 'destination-over';

        this.mainContext = this.mainCanvas.getContext('2d');
        this.mainContext.globalCompositeOperation = 'source-over';


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

        this.background = new Background();
        this.background.init(0,0,0,0);

        this.player = new Player;
        var playerX = this.playerCanvas.width/2-150;
        var playerY = Math.ceil(this.playerCanvas.height*0.8);
        this.player.init(playerX, playerY, 150, 150);

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

  var start1, start2;
  var cum = 0;
  var gameLoop = function(timestamp) {
    if (!start1) { start1 = timestamp; }
    if (!start2) { start2 = timestamp; }

    // if more than 50 ms since last timestamp
    if (timestamp - start1 >= 50) {
      game.background.draw(game);
      game.player.shoot();
      game.player.packBullets.forEach(function(bullet) {
        if (bullet.active) {
          bullet.draw();
        }
      });
      // cum += Math.ceil(start1);
      // if (cum % 2 === 0) {
        game.background.packAsteroids.forEach(function(asteroid) {
          if (asteroid.active) {
            asteroid.draw();
          }
        });

      // }
      start1 = timestamp;
    }

    if (timestamp - start2 >= 15) {
      game.player.draw();
      game.player.move(game.background);

      start2 = timestamp;
    }



    // if (game.player.x < 20) {
    //   game.background.move(game.player.speed*0.5,0);
    //   game.player.x = 20;
    // }
    // else if (game.player.x > Math.ceil(game.player.canvasWidth - game.player.width - 20)) {
    //   game.background.move(-game.player.speed*0.5,0);
    //   game.player.x = Math.ceil(game.player.canvasWidth - game.player.width - 20);
    // }
    // else if (game.player.y < Math.ceil(game.player.canvasHeight*0.3)) {
    //   game.background.move(0, game.player.speed*0.5);
    //   game.player.y = Math.ceil(game.player.canvasHeight*0.3);
    // }
    // else if (game.player.y > Math.ceil(game.player.canvasHeight*0.9)) {
    //   game.background.move(0,-game.player.speed*0.5);
    //   game.player.y = Math.ceil(game.player.canvasHeight*0.9);
    // }

    window.requestAnimationFrame(gameLoop);
  };

  return game;

});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
