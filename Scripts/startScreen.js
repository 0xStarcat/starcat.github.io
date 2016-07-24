function animateStartScreen(){

var randomTime = Math.floor((Math.random()*2500)+2500);
var randomTop = 30 - Math.floor((Math.random()*4));
var randomLeft = 1.5 - Math.floor((Math.random()*3));


  var animateStart = function() {
      $startButton.animate({
      'margin-top': '42vh',
       'margin-left':'2vh'
    },randomTime,function(){
      randomTime = Math.floor((Math.random()*2500)+2500);
      randomTop = 40 - Math.floor((Math.random()*4));
      randomLeft = 2 - Math.floor((Math.random()*4));
    })
    .animate({
      'margin-top': '42vh',
       'margin-left':'-2vh'
    },randomTime,function(){
      randomTime = Math.floor((Math.random()*2500)+2500);
      randomTop = 40 - Math.floor((Math.random()*4));
      randomLeft = 2 - Math.floor((Math.random()*4));
    })
    .animate({
      'margin-top': '40vh',
       'margin-left':'0vh'
    },randomTime,function(){
      randomTime = Math.floor((Math.random()*2500)+2500);
      randomTop = 40 - Math.floor((Math.random()*4));
      randomLeft = 2 - Math.floor((Math.random()*4));
      animateStart();
    });
  }
    animateStart();

  var animateOptions = function(){
      $optionsButton.animate({
      'margin-top': randomTop+'vh',
       'margin-left':randomLeft+'vh'
    },randomTime, function(){
       randomTime = Math.floor((Math.random()*2500)+2500);
       randomTop = 30 - Math.floor((Math.random()*4));
       randomLeft = 2 - Math.floor((Math.random()*4));
    })
    .animate({
      'margin-top': randomTop+'vh',
       'margin-left':randomLeft+'vh'
    },randomTime, function(){
       randomTime = Math.floor((Math.random()*2500)+2500);
       randomTop = 30 - Math.floor((Math.random()*4));
       randomLeft = 2 - Math.floor((Math.random()*4));
    })
    .animate({
      'margin-top': randomTop+'vh',
       'margin-left':randomLeft+'0vh'
    },randomTime, function(){
       randomTime = Math.floor((Math.random()*2500)+2500);
       randomTop = 30 - Math.floor((Math.random()*4));
       randomLeft = 2 - Math.floor((Math.random()*4));
       animateOptions();
    });
  }
  animateOptions();

  var animateCredits = function(){
      $creditsButton.animate({
      'margin-top': randomTop+'vh',
       'margin-left':randomLeft+'vh'
    },randomTime, function(){
       randomTime = Math.floor((Math.random()*2500)+2500);
       randomTop = 30 - Math.floor((Math.random()*4));
       randomLeft = 2 - Math.floor((Math.random()*4));
    })
    .animate({
      'margin-top': randomTop+'vh',
       'margin-left':randomLeft+'vh'
    },randomTime, function(){
       randomTime = Math.floor((Math.random()*2500)+2500);
       randomTop = 30 - Math.floor((Math.random()*4));
       randomLeft = 2 - Math.floor((Math.random()*4));
    })
    .animate({
      'margin-top': randomTop+'vh',
       'margin-left':randomLeft+'vh'
    },randomTime, function(){
       randomTime = Math.floor((Math.random()*2500)+2500);
       randomTop = 30 - Math.floor((Math.random()*4));
       randomLeft = 2 - Math.floor((Math.random()*4));
       animateCredits();
    });
  }
  animateCredits();

}
