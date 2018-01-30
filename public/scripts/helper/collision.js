
define([], function() {

  'use strict';

  var Collision = function() {

  };

  Collision.prototype.backgroundPlayer = function(player) {
    if (player.x < 20) {
      player.x = 20;
    }
    else if (player.x > player.canvasWidth - player.width - 20) {
      player.x = player.canvasWidth - player.width - 20;
    }
    else if (player.y < 20) {
      player.y = 20;
    }
    else if (player.y > Math.ceil(player.canvasHeight - player.height - 20)) {
      player.y = Math.ceil(player.canvasHeight - player.height -20);
    }
  };

  Collision.prototype.Field = function(arrayAsteroids, currentAsteroid) {
    var collision = false;
    if (arrayAsteroids.length) {
      arrayAsteroids.forEach(function(a,i) {
        if (a !== currentAsteroid) {
          if (a.x < currentAsteroid.x + currentAsteroid.width &&
          a.x + a.width > currentAsteroid.x &&
          a.y < currentAsteroid.y + currentAsteroid.height &&
          a.height + a.y > currentAsteroid.y) {
            collision = true;
          }
        }
      });
    }
    return collision;
  };


  return Collision;

});


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
