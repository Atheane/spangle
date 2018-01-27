define(['./image', './dessin'], function(image, Dessin) {

  'use strict';

  var Background = function() {
    this.speed = 1;
    this.totalSeconds = 0;
    this.shiftCameraX = 0;
    this.shiftCameraY = 0;
    this.cumShiftX = image.background.width;
    this.cumShiftY = image.background.height;
  }

  var dessin = new Dessin();

  Background.prototype = dessin;

  Background.prototype.draw = function(game) {

    this.width = image.background.width;
    this.height = image.background.height;

    this.totalSeconds += 1;

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

    var numImagesX = Math.ceil(this.canvasWidth/this.width) + 1;
    var numImagesY = Math.ceil(this.canvasHeight/this.height) + 1;
    var xpos = Math.ceil((this.cumShiftX*0.05 + this.shiftCameraX*0.4) % this.width) ;
    var ypos =  Math.ceil((this.totalSeconds * this.speed + this.cumShiftY*0.05 + this.shiftCameraY*0.4) % this.height);

    this.context.save();
    this.context.translate(-xpos, ypos);
    for (var i = -1; i < numImagesX ; i++) {
      for (var j = -1; j < numImagesY; j++) {
        this.x = -i * this.width;
        this.y = -j * this.height;
        this.context.drawImage(image.background, this.x, this.y);
       }
     }
    this.context.restore();

  };

  // pour gérer les collisions avec le bord d'écran
  Background.prototype.move = function(x, y) {
    this.context.translate(x, y);
    this.shiftCameraX -= x;
    this.shiftCameraY -= y;
  }

return Background;

});
