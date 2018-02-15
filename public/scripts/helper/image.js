define(['../jquery'], function ($) {

  'use strict';

  var image = {};
  image.background = new Image;
  image.player = new Image;
  image.bulletShort = new Image;
  image.asteroid = new Image;
  image.explosion = new Image;
  image.html = new Image;

  var imageLoading = function() {
    $(image.background).on('load', function() {
      console.log('Background Image Loaded');
    });
    $(image.player).on('load', function() {
      console.log('Player Image Loaded');
    });
    $(image.bulletShort).on('load', function() {
      console.log('bulletShort Image Loaded');
    });
    $(image.asteroid).on('load', function() {
      console.log('Asteroid Image Loaded');
    });
    $(image.explosion).on('load', function() {
      console.log('Explosion Big Loaded');
    });
    $(image.html).on('load', function() {
      console.log('HTML image Loaded');
    });

    image.background.src = '../../img/paralax_simple.png';
    image.player.src = '../../img/EnemyDefense.png';
    image.bulletShort.src = '../../img/bullet_blaster_small_single.png';
    image.asteroid.src = '../../img/asteroid_01_with_cracks.png';
    image.explosion.src = '../../img/explosion_big.png';
    image.html.src = '../../img/HTML5.png';

  };

  imageLoading();

  return image;

});
