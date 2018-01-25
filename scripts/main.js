'use strict';

// requirejs(["helper/image"], function(image) {
    //This function is called when scripts/helper/util.js is loaded.
    //If util.js calls define(), then this function is not fired until
    //util's dependencies have loaded, and the util argument will hold
    //the module value for "helper/util".





  //////////////////////////////////////////////////////////////////////////
  //                         Gestion des image                          //
  /////////////////////////////////////////////////////////////////////////

// (function() {


  // var image = {
  //   background: new Image(),
  //   player: new Image(),
  //   counter: 0
  //   // bullet = new Image()
  // };

  var imageLoading = function(callback) {
    image.player.addEventListener('load', function() {
      callback();
    });
    image.background.addEventListener('load', function() {
      callback();
    });

    // bullet.addEventListener('load', function() {
    //   counter++;
    // });
    // pour charger les images en mémoire (async)
    image.background.src = './assets/backgrounds/background_02_parallax_01.png';
    image.player.src = './assets/spaceships/EnemyDefense.png';

  }



  //////////////////////////////////////////////////////////////////
  //                  Objets dessinés sur les canvas              //
  //////////////////////////////////////////////////////////////////

  // Prototype de l'ensemble des futurs dessins
  // TO-DO : fonction usine pour minimiser l'espace mémoire ?
  // var Dessin = function() {
  //     this.init = function(x, y, width, height) {
  //       this.x = x;
  //       this.y = y;
  //       this.width = width;
  //       this.height = height;
  //     }
  //     this.speed = 0;
  //     this.canvasWidth = 0;
  //     this.canvasHeight = 0;
  // }

  // // // On prévoit une méthode draw (obligatoire avec canvas)
  // Dessin.prototype.draw = function() {
  // };

  // // // instance pour mettre en place la chaine de prototype
  // var dessin = new Dessin;


  //////////////////////////// Premier enfant : objet background
  // Fonction constructeur background




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
  var c = 0;


  var lastPlayer =  {};

  Background.prototype.draw = function(delta) {

    this.totalSeconds += 1;
    var vy = -1; //nombre de pixels par seconde

    if (leftPressed) {
      this.cumShiftX -= game.player.speed;
    }
    else if (rightPressed) {
      this.cumShiftX += game.player.speed;
    }

    if (upPressed) {
      this.cumShiftY -= game.player.speed;
    }
    else if (downPressed) {
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



  ///////////////////////////////////////////////////////////////////
  //                      SPACE SHIP OBJECT
  ///////////////////////////////////////////////////////////////////

  // spaceSphip object
  // It inherits from background object method init()
  var Player = function() {
    this.speed = 25;
    // this.acceleration = 1.3;
    this.i = 1;
    this.j = 0;
    this.lastX = 0;
    this.lastY = 0;
  }

  Player.prototype.init = function(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  Player.prototype.draw = function() {
    var boundariesX = [0, 2048, 4096];
    var boundariesY = [0, 2048, 4096, 6144];

    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.context.drawImage(image.player, boundariesX[this.i], boundariesY[this.j], image.player.width/boundariesX.length, image.player.height/boundariesY.length, this.x, this.y, this.width, this.height);
   };

  var rightPressed, leftPressed, upPressed, downPressed, mitraillettePressed, roquettePressed;


  Player.prototype.move = function() {
    if (leftPressed) {
      this.x -= this.speed;
      (this.i > 0) ? this.i-=1 : this.i=0;
    }
    else if (rightPressed) {
      this.x += this.speed;
      (this.i < 2) ? this.i+=1 : this.i=2;
    }
    if (upPressed) {
      this.y -= this.speed;
    }
    else if (downPressed) {
      this.y += this.speed ;
    }
    // console.log(this.x, this.y);

  };

  Player.prototype.shoot = function() {
    if (mitraillettePressed && !roquettePressed) {
      this.j = 1;
    }
    else if (!mitraillettePressed && roquettePressed) {
      this.j = 2;
    }
    else if (mitraillettePressed && roquettePressed) {
      this.j = 3;
    }
    else {
      this.j = 0;
    }
  }



  //////////////////////////////////////////////////////////////////////////
  ///                             Objet JEU                              ///
  //////////////////////////////////////////////////////////////////////////

  var Game = function() {
    this.init = function() {
      imageLoading(function(){console.log("ready!")});

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
  }

  var game = new Game();

  var start;

  //////////////////////////////////////////////////////////////////////////
  ///                         Animation JEU                              ///
  //////////////////////////////////////////////////////////////////////////


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

  }


  ///////////////////////////////////////////////////////////////////
  //                      EVENTS HANDLERS
  ///////////////////////////////////////////////////////////////////

  document.addEventListener('DOMContentLoaded', function() {
    if (game.init()) {
      game.start();
    }

  });


 document.addEventListener('keydown', function(e) {
    if (e.keyCode === 39) {
      rightPressed = true;
    }
    else if(e.keyCode === 37) {
      leftPressed = true;
    }
    if(e.keyCode === 40) {
      downPressed = true;
    }
    else if(e.keyCode === 38) {
      upPressed = true;
    }
    if (e.keyCode === 77) {
      mitraillettePressed = true;
    }
    if (e.keyCode === 82) {
      roquettePressed = true;
    }

  });

  document.addEventListener('keyup', function(e) {
    if(e.keyCode === 39) {
      rightPressed = false;
      game.player.i = 1;
    }
    else if(e.keyCode === 37) {
      leftPressed = false;
      game.player.i = 1;
    }
    if(e.keyCode === 40) {
      downPressed = false;
    }
    else if(e.keyCode === 38) {
      upPressed = false;
    }
    if (e.keyCode === 77) {
      mitraillettePressed = false;
    }
    if (e.keyCode === 82) {
      roquettePressed = false;
    }

  });

// });
// }());
