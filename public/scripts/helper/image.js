define(['../jquery'], function ($) {

  'use strict';

  var image = {};
  image.background = new Image;
  image.player = new Image;
  image.bulletShort = new Image;
  image.asteroid = new Image;
  image.explosion = new Image;
  image.html = new Image;
  image.css = new Image;
  image.js = new Image;
  image.jquery = new Image;
  image.angular = new Image;
  image.mongodb = new Image;
  image.node = new Image;
  image.express = new Image;
  image.ajax = new Image;
  image.meteor = new Image;
  image.ruby = new Image;
  image.ror = new Image;
  image.postgresql = new Image;
  image.python = new Image;
  image.d3 = new Image;
  image.react = new Image;
  image.redux = new Image;


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
    $(image.css).on('load', function() {
      console.log('CSS image Loaded');
    });
    $(image.js).on('load', function() {
      console.log('JS image Loaded');
    });
    $(image.jquery).on('load', function() {
      console.log('Jquery image Loaded');
    });
    $(image.angular).on('load', function() {
      console.log('Angular image Loaded');
    });
    $(image.mongodb).on('load', function() {
      console.log('MongoDB image Loaded');
    });
    $(image.node).on('load', function() {
      console.log('Node image Loaded');
    });
    $(image.express).on('load', function() {
      console.log('Express image Loaded');
    });
    $(image.ajax).on('load', function() {
      console.log('Ajax image Loaded');
    });
    $(image.meteor).on('load', function() {
      console.log('Meteor image Loaded');
    });
    $(image.ruby).on('load', function() {
      console.log('Ruby image Loaded');
    });
    $(image.ror).on('load', function() {
      console.log('Ror image Loaded');
    });
    $(image.postgresql).on('load', function() {
      console.log('Postgresql image Loaded');
    });
    $(image.python).on('load', function() {
      console.log('Python image Loaded');
    });
    $(image.d3).on('load', function() {
      console.log('D3 image Loaded');
    });
    $(image.react).on('load', function() {
      console.log('React image Loaded');
    });
    $(image.redux).on('load', function() {
      console.log('Redux image Loaded');
    });

    image.background.src = '../../img/paralax_simple.png';
    image.player.src = '../../img/EnemyDefense.png';
    image.bulletShort.src = '../../img/bullet_blaster_small_single.png';
    image.asteroid.src = '../../img/asteroid_01_with_cracks.png';
    image.explosion.src = '../../img/explosion_big.png';
    image.html.src = '../../img/HTML5.png';
    image.css.src = '../../img/css.png';
    image.js.src = '../../img/js.png';
    image.jquery.src = '../../img/jquery.png';
    image.angular.src = '../../img/angular.png';
    image.mongodb.src = '../../img/mongodb.png';
    image.node.src = '../../img/nodejs.png';
    image.express.src = '../../img/expressJS.png';
    image.ajax.src = '../../img/ajax.png';
    image.meteor.src = '../../img/meteor.png';
    image.ruby.src = '../../img/ruby.png';
    image.ror.src = '../../img/ror.jpg';
    image.postgresql.src = '../../img/postgresql.png';
    image.python.src = '../../img/python.png';
    image.d3.src = '../../img/D3.png';
    image.react.src = '../../img/react.png';
    image.redux.src = '../../img/redux.png';
  };

  imageLoading();

  return image;

});
