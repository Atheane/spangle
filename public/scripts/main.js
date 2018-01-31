
require(['helper/game', 'helper/key', 'jquery'],
  function(game, key, $) {


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


 $(document).keydown(function(e) {
    if (e.keyCode === 39) {
      key.rightPressed = true;
    }
    else if(e.keyCode === 37) {
      key.leftPressed = true;
    }
    if(e.keyCode === 40) {
      key.downPressed = true;
    }
    else if(e.keyCode === 38) {
      key.upPressed = true;
    }
    if (e.keyCode === 32) {
      key.mitraillettePressed = true;
    }
    if (e.keyCode === 82) {
      key.roquettePressed = true;
    }

  });

  $(document).keyup(function(e) {
    if(e.keyCode === 39) {
      key.rightPressed = false;
      game.player.i = 1;
    }
    else if(e.keyCode === 37) {
      key.leftPressed = false;
      game.player.i = 1;
    }
    if(e.keyCode === 40) {
      key.downPressed = false;
    }
    else if(e.keyCode === 38) {
      key.upPressed = false;
    }
    if (e.keyCode === 32) {
      key.mitraillettePressed = false;
    }
    if (e.keyCode === 82) {
      key.roquettePressed = false;
    }

  });

});
