define(['../jquery'], function ($) {

  'use strict';

  var image = {};
  image.background = new Image;
  image.player = new Image;
  // image.bullet = new Image;

  var imageLoading = function() {
    $(image.background).on('load', function() {
      console.log('Background Image Loaded');
    });
    $(image.player).on('load', function() {
      console.log('Player Image Loaded');
    });
    // image.bullet.

    image.background.src = '../../assets/backgrounds/background_02_parallax_01.png';
    image.player.src = '../../assets/spaceships/EnemyDefense.png';
  };

  imageLoading();

  return image;

});
