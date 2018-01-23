
//////////////////////////////////////////////////////////////////////////
//                         Gestion des Images                          //
/////////////////////////////////////////////////////////////////////////


// objet litéral servant à stocker toutes les images <img>
// pour ne pas avoir à la regénérer à chaque fois qu'on en a besoin

var images = {
  background: new Image()
};

// pour charger l'image en mémoire
images.background.src = './assets/backgrounds/background_02_parallax_01.png'


// Prototype de tous les futur dessins
// TO-DO : fonction usine pour minimiser l'espace mémoire
var Dessin = function() {
    this.init = function(x, y) {
      this.x = x;
      this.y = y;
    }
    this.speed = 0;
    this.canvasWidth = 0;
    this.canvasHeight = 0;
}

Dessin.prototype.draw = function() {
};

var dessin = new Dessin;


// Fonction constructeur background
var Background = function() {
  this.speed = 1;
}

Background.prototype.draw = function() {
  // décale le background en fonction de la vitesse indiquée
  this.y += this.speed;
  // la propriété context est définie dans la fonction constructeur Game
  this.context.drawImage(images.background, this.x, this.y);
  this.context.drawImage(images.background, this.x, this.y - this.canvasHeigh);

  if (this.y >= this.canvasHeight) {
    this.y = 0;
  }
};

// Hérite des propriétés de la fonction constructeur dessin
Background.prototype = dessin;


//////////////////////////////////////////////////////////////////////////
///                    Fonction Constructeur jeu                       ///
//////////////////////////////////////////////////////////////////////////

var Game = function() {
  this.init = function() {
    this.bg = document.getElementById('background');
      // vérifier si canvas est bien supporté par le navigateur
    if (this.bg.getContext) {
      this.ctxBg = this.bg.getContext('2d');
      this.bg.width  = window.innerWidth;
      this.bg.height = window.innerHeight;
      // on ajoute les propriétés manquantes à Background
      // utilisées dans la méthode draw
      Background.prototype.context = this.ctxBg;
      Background.prototype.canvasWidth = this.bg.width;
      Background.prototype.canvasHeight = this.bg.height;

      this.background = new Background();
      this.background.init(0,0); // Set draw point to 0,0
      return true;
    }
    else {
      return false;
    }
  };
  // Start the animation loop
  this.start = function() {
    animate();
  };
}


////////////////////////////////////////////////////////////////////////////
///                         Animation Loop                               ///
////////////////////////////////////////////////////////////////////////////

var game = new Game();

var animate = function() {
  requestAnimFrame( animate );
  game.background.draw();
}

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame   ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      window.oRequestAnimationFrame      ||
      window.msRequestAnimationFrame     ||
      function(callback, element){
        window.setTimeout(callback, 1000 / 60);
      };
})();



