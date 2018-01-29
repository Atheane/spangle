define(['../jquery'], function ($) {

  'use strict';

  var image = {};
  image.background = new Image;
  image.player = new Image;
  image.bulletShort = new Image;
  // image.bulletLong = new Image;
  image.asteroid = new Image;


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
    // $(image.bulletLong).on('load', function() {
    //   console.log('bulletLong Image Loaded');
    // });
    $(image.asteroid).on('load', function() {
      console.log('Asteroid Image Loaded');
    });

    image.background.src = '../../assets/backgrounds/background_02_parallax_01.png';
    image.player.src = '../../assets/spaceships/EnemyDefense.png';
    image.bulletShort.src = '../../assets/weapons/bullet_blaster_small_single.png';
    // image.bulletLong.src = '../../assets/weapons/bullet_long_single.png';
    image.asteroid.src = '../../assets/asteroids/asteroid_01_with_cracks.png';

  };

  imageLoading();

  return image;

});
