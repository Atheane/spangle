define(['require','./background', './player'], function(require, Background, Player) {

  'use strict';

  var Game = function() {
    this.init = function() {

      this.bgCanvas = document.getElementById('background');
      this.playerCanvas = document.getElementById('player');

        // vérifier si canvas est bien supporté par le navigateur
      if (this.bgCanvas.getContext) {

        this.bgContext = this.bgCanvas.getContext('2d');
        this.bgContext.globalCompositeOperation = 'destination-over';

        this.playerContext = this.playerCanvas.getContext('2d');

        this.bgCanvas.width  = window.innerWidth;
        this.bgCanvas.height = window.innerHeight;
        this.playerCanvas.width  = window.innerWidth;
        this.playerCanvas.height = window.innerHeight;
        // on ajoute les propriétés manquantes à Background
        // utilisées dans la méthode draw
        Background.prototype.context = this.bgContext;
        Background.prototype.canvasWidth = this.bgCanvas.width;
        Background.prototype.canvasHeight = this.bgCanvas.height;

        Player.prototype.context = this.playerContext;
        Player.prototype.canvasWidth = this.playerCanvas.width;
        Player.prototype.canvasHeight = this.playerCanvas.height;

        this.background = new Background();
        this.background.init(0,0,0,0);

        this.player = new Player();

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

  var start;
  var gameLoop = function(timestamp) {
    if (!start) { start = timestamp; }
    // if more than 50 ms since last timestamp
    if (timestamp - start >= 50) {
      game.background.draw(game);
      start = timestamp;

    }
    if (timestamp - start >= 15) {
      game.player.draw();
      game.player.move();
      game.player.shoot();
      // start = timestamp;
    }

    if (game.player.x < 20) {
      game.background.move(game.player.speed*0.5,0);
      game.player.x = 20;
    }
    else if (game.player.x > game.background.canvasWidth - game.player.width - 20) {
      game.background.move(-game.player.speed*0.5,0);
      game.player.x = game.background.canvasWidth - game.player.width - 20;
    }
    else if (game.player.y < 20) {
      game.background.move(0,game.player.speed*0.5);
      game.player.y = 20;
    }
    else if (game.player.y > game.background.canvasHeight - game.player.height - 20) {
      game.background.move(0,-game.player.speed*0.5);
      game.player.y = game.background.canvasHeight - game.player.height - 20;
    }
    window.requestAnimationFrame(gameLoop);
  };

  return game;

});
