
require(['helper/game'],
  function(game) {


  'use strict';


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
