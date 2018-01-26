
require(['helper/image', 'helper/player'],
  function(image, Player) {


  'use strict';

  ///////////////////////////////////////////////////////////////
  //                         BACKGROUND                        //
  ///////////////////////////////////////////////////////////////

  var Background = function() {
    this.speed = 5;
    this.totalSeconds = 0;
    this.shiftCameraX = 0;
    this.shiftCameraY = 0;
    this.cumShiftX = image.background.width;
    this.cumShiftY = image.background.height;
  }

  Background.prototype.init = function(x,y) {
    this.x = x;
    this.y = y;
  }

  Background.prototype.draw = function(delta) {

    this.totalSeconds += 1;
    var vy = -1; //nombre de pixels par seconde

    if (game.player.leftPressed) {
      this.cumShiftX -= game.player.speed;
    }
    else if (game.player.rightPressed) {
      this.cumShiftX += game.player.speed;
    }

    if (game.player.upPressed) {
      this.cumShiftY -= game.player.speed;
    }
    else if (game.player.downPressed) {
      this.cumShiftY += game.player.speed;
    }

    var numImagesX = Math.ceil(this.canvasWidth/image.background.width) + 1;
    var numImagesY = Math.ceil(this.canvasHeight/image.background.height) + 1;
    var xpos = Math.ceil((this.cumShiftX*0.05 + this.shiftCameraX*0.4) % image.background.width) ;
    var ypos =  Math.ceil((this.totalSeconds * vy + this.cumShiftY*0.05 + this.shiftCameraY*0.4) % image.background.height);

    this.context.save();
    this.context.translate(-xpos, -ypos);
    for (var i = -1; i < numImagesX ; i++) {
      for (var j = -1; j < numImagesY; j++) {
        this.x = -i * image.background.width  ;
        this.y = -j * image.background.height ;
        this.context.drawImage(image.background, this.x, this.y);
       }
     }
    this.context.restore();

  };

  // pour gérer les collisions avec le bord d'écran
  Background.prototype.move = function(x,y) {
    this.context.translate(x, y);
    this.shiftCameraX -= x;
    this.shiftCameraY -= y;
  }


  /////////////////////////////////////////////////////////
  //                         GAME                        //
  /////////////////////////////////////////////////////////

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
        this.background.init(0,0);

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


///////////////////////////////////////////////////////////
//                        GAME LOOP                      //
///////////////////////////////////////////////////////////

var start;
  var gameLoop = function(timestamp) {
    if (!start) { start = timestamp; }
    // if more than 50 ms since last timestamp
    if (timestamp - start >= 50) {
      game.background.draw();
      start = timestamp;

    }
    if (timestamp - start >= 15) {
      game.player.draw((timestamp - start)/1000);
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
    // if (!game.pause) {
    window.requestAnimationFrame(gameLoop);
    // }
  };


///////////////////////////////////////////////////////////
//                   EVENT HANDLERS                      //
///////////////////////////////////////////////////////////

  require(['./domReady'], function (domReady) {
    domReady(function () {
      if (game.init()) {
        game.start();
        console.log("game start");
      }
    });
  });


 document.addEventListener('keydown', function(e) {
    if (e.keyCode === 39) {
      game.player.rightPressed = true;
    }
    else if(e.keyCode === 37) {
      game.player.leftPressed = true;
    }
    if(e.keyCode === 40) {
      game.player.downPressed = true;
    }
    else if(e.keyCode === 38) {
      game.player.upPressed = true;
    }
    if (e.keyCode === 77) {
      game.player.mitraillettePressed = true;
    }
    if (e.keyCode === 82) {
      game.player.roquettePressed = true;
    }

  });

  document.addEventListener('keyup', function(e) {
    if(e.keyCode === 39) {
      game.player.rightPressed = false;
      game.player.i = 1;
    }
    else if(e.keyCode === 37) {
      game.player.leftPressed = false;
      game.player.i = 1;
    }
    if(e.keyCode === 40) {
      game.player.downPressed = false;
    }
    else if(e.keyCode === 38) {
      game.player.upPressed = false;
    }
    if (e.keyCode === 77) {
      game.player.mitraillettePressed = false;
    }
    if (e.keyCode === 82) {
      game.player.roquettePressed = false;
    }

  });

});
