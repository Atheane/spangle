
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

  Collision.prototype.field = function(arrayAsteroids, currentAsteroid) {
    var collision = false;
    if (arrayAsteroids.length) {
      arrayAsteroids.forEach(function(a,i) {
        if (a !== currentAsteroid) {
          if (a.x < currentAsteroid.x + currentAsteroid.width && a.x + a.width > currentAsteroid.x &&
          a.y < currentAsteroid.y + currentAsteroid.height && a.height + a.y > currentAsteroid.y) {
            collision = true;
          }
        }
      });
    }
    return collision;
  };

  Collision.prototype.asteroid = function(asteroid, obj) {
    var collision = false;
    if (asteroid.x < obj.x + obj.width  && asteroid.x + asteroid.width > obj.x &&
        asteroid.y < obj.y + obj.height && asteroid.height + asteroid.y > obj.y ||
        asteroid.x < obj.x + 44 + obj.width  && asteroid.x + asteroid.width > obj.x + 44 &&
        asteroid.y < obj.y + obj.height && asteroid.height + asteroid.y > obj.y) {
            collision = true;
        }
    return collision;
  }

  return Collision;

});

