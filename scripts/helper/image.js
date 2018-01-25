define(function () {

  'use strict';

  var image = {};
  image.background = new Image;
  image.player = new Image;

  var imageLoading = function() {
    image.player.addEventListener('load', function() {
      console.log('Player Image Loaded');
    });
    image.background.addEventListener('load', function() {
      console.log('Background Image Loaded');
    });
    image.background.src = '../../assets/backgrounds/background_02_parallax_01.png';
    image.player.src = '../../assets/spaceships/EnemyDefense.png';
  };

  imageLoading();

  return image;

});
