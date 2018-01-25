

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
