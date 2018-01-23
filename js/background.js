
  var bg, ctxBg;
  var totalSeconds = 0;

  var background = {
    src: './assets/backgrounds/background_02_parallax_01.png',
    init: function() {
            var img = new Image();
            img.src = this.src;
            return img;
          },
    draw: function(delay) {

            var img = this.init();

            img.addEventListener('load', function() {
              totalSeconds += delay;

              var vx = 1;
              var vy = 100; // the background scrolls with a speed of 100 pixels/sec

              var numImagesX = Math.ceil(bg.width / img.width) + 1;
              var numImagesY = Math.ceil(bg.height / img.height) + 1;

              var xpos =  (totalSeconds * vx + spaceShip.x*0.4)  % img.width ;
              var ypos = (canvas.height - totalSeconds * vy) % img.height;

              ctxBg.save();
              ctxBg.translate(-xpos, -ypos);

              for (var i = 0; i < numImagesX; i++) {
                for (var j = 0; j < numImagesY; j++) {
                  ctxBg.drawImage(img, i * img.width, -j * img.height - spaceShip.y*0.4);
                 }
               }
              ctxBg.restore();
            });
          }
  }


  document.addEventListener('DOMContentLoaded', function() {

    bg = document.getElementById("background");
    ctxBg = bg.getContext('2d');
    bg.width  = window.innerWidth;
    bg.height = window.innerHeight;

  });
