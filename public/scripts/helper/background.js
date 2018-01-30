define(['./image', './dessin', './asteroid'], function(image, Dessin, Asteroid) {

  'use strict';

  var Background = function() {
    this.speed = 4;
  }

  var dessin = new Dessin();

  Background.prototype = dessin;

  Background.prototype.draw = function() {

    // Pan background
    this.y += this.speed;

    var numImagesX = Math.ceil(this.canvasWidth / image.background.width) + 1;
    var numImagesY = Math.ceil(this.canvasHeight / image.background.height) + 1;

    for (var i = 0; i < numImagesX; i++) {
      for (var j = -1; j < numImagesY; j++) {
        var w = image.background.width;
        var h = image.background.height;
        this.context.drawImage(image.background, 0, 0, w, h, i*w, j*h + this.y, w, h);
      }
    }

    if (this.y > h) {
      this.y = 0;
    }


    // this.context.drawImage(image.background, 0, 0, image.background.width, image.background.height, );
    // // Draw another image at the top edge of the first image
    // // this.context.drawImage(image.background, this.x, this.y - this.canvasHeight);
    // // If the image scrolled off the screen, reset
    // if (this.y >= this.canvasHeight) {
    //   this.y = 0;
    // }

   };

return Background;

});
