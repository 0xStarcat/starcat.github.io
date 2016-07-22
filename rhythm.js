 var $arrowSpawner = $('#arrowSpawner');
 var $targetLeft = $('#phLeft');
 var $targetUp = $('#phUp');
 var $targetDown = $('#phDown');
 var $targetRight = $('#phRight');
 var $rhythmZone = $('#rhythmZone');
 var arrows = ['Left','Up','Down','Right'];
 var miniGameCounter = 5;

 var rhythmZoneTop = $rhythmZone.position().top;
 var rhythmZoneBottom = $rhythmZone.position().top + $rhythmZone.innerHeight();

$('document').ready(function(){

  console.log('Rhythm game... standing by!');
  addRhythmListeners()
});

var createArrow = function(direction, speed){
  var isActive = true;

  speed = (speed*2);
  var theKey = 0;
  if (direction === 'Left')
  {
    theKey = 37;
  } else if (direction === 'Up'){
    theKey = 38;
  } else if (direction === 'Down'){
   theKey = 40;
  } else if (direction === 'Right'){
    theKey = 39;
  }

  var arrow =  $('<div class="arrow arrowBackground"></div><div class="arrow" id='+direction+'></div>');

    $('#q'+direction).append(arrow);

    var arrowCenter = (arrow.position().top + arrow.innerHeight() / 2)




      $(window).on('keydown', function(e){
        if (isActive){
        //console.log('#######POSITION ########'+arrow.position().top)
        if (e.keyCode === theKey || e.which === theKey)
        {
          //console.log(direction+' pressed. ARROW CENTER = '+(arrow.position().top + arrow.innerHeight() / 2)+' ZONE BOTTOM = '+rhythmZoneBottom+ ' ZONE TOP = '+rhythmZoneTop)
          if ((arrow.position().top + arrow.innerHeight() / 2) <= rhythmZoneBottom + 5 && (arrow.position().top + arrow.innerHeight() / 2) >= rhythmZoneTop - 5)
          {
            //console.log(direction+' arrow in Rhythm!');
            isActive = false;
            arrow.remove();
            arrow.stop();
             //$(window).off('keydown');
          } else if (arrow.position().top >= rhythmZoneTop - 300){
            //console.log(direction+' #####Off rhythm!######');
            miniGameCounter--;
            $angleBox.css({
              'box-shadow': '0px 0px 0px '+miniGameCounter+'0px rgba(255, 255, 255, 0.5)'
            });

            // $('#ph'+direction).css({
            //   'background-color' : 'red'
            // });
            // setTimeout(function(){
            //    $('#ph'+direction).css({
            //   'background-color' : 'white'
            // });
            //  }, 250);

            // $('#ph'+direction).animate({
            //   'background-color' : 'red'
            // }, 500)
            // .animate({
            //   'background-color' : 'white'
            // }, 1000);
            isActive = false;
            arrow.remove();
            arrow.stop();
          }
        }
        }
      });

//#######
//If the animation reaches bottom, you get penalized. The animation is stopped with arrow.stop() if a condition
// is met from above.
//######
  arrow.animate({
        'top': '100vh'
      }, speed, function(){
        isActive=false;
        arrow.remove();
        //$(window).off('keydown');

         miniGameCounter--;
            $angleBox.css({
              'box-shadow': '0px 0px 0px '+miniGameCounter+'0px rgba(255, 255, 255, 0.5)'
            });

      });

};

var checkCounter = function(){

  if (miniGameCounter <= 0)
  {
    console.log('Lost Mini-Game');
  }

}

var rhythmGame = function(length, speed){

//#######
//Create arrows at set intervals (speed) for a duration (length)
//#######
$angleBox.css({
              'box-shadow': '0px 0px 0px 50px rgba(255, 255, 255, 0.5)'
            });

miniGameCounter = 5;
$angleBox.css({
            'box-shadow': '0px 0px 0px 50px rgba(255, 255, 255, 0.5)'
          });

  var rhythmGameRun = setInterval(function()
  {
    var randomNumber = Math.floor(Math.random() * arrows.length)
    createArrow(arrows[randomNumber], speed);
    //console.log(arrows[randomNumber])
  }, speed);
  setTimeout(function(){
  clearTimeout(rhythmGameRun);
  $angleBox.css({
              'box-shadow': '0px 0px 0px 0px rgba(255, 255, 255, 0.5)'
            });
  }, length);
}

var addRhythmListeners = function(){

  $(window).on('keydown', function(e){
    if (e.keyCode === 37 || e.which === 37)
    {
      $targetLeft.css({
        opacity: 1,
        'box-shadow': '0px 0px 0px 8px white'
      });

    } else if (e.keyCode === 38 || e.which === 38)
    {
      $targetUp.css({
        opacity: 1,
        'box-shadow': '0px 0px 0px 8px white'
      });
    } else if (e.keyCode === 39 || e.which === 39)
    {
      $targetRight.css({
        opacity: 1,
        'box-shadow': '0px 0px 0px 8px white'
      });
    } else if (e.keyCode === 40 || e.which === 40)
    {
      $targetDown.css({
        opacity: 1,
        'box-shadow': '0px 0px 0px 8px white'
      });
    }
  });

  $(window).on('keyup', function(e){
    if (e.keyCode === 37 || e.which === 37)
    {
      $targetLeft.css({
        opacity: 0.5,
        'box-shadow': '0px 0px 0px 4px white'
      });

    } else if (e.keyCode === 38 || e.which === 38)
    {
      $targetUp.css({
        opacity: 0.5,
        'box-shadow': '0px 0px 0px 4px white'
      });
    } else if (e.keyCode === 39 || e.which === 39)
    {
      $targetRight.css({
        opacity: 0.5,
        'box-shadow': '0px 0px 0px 4px white'
      });
    } else if (e.keyCode === 40 || e.which === 40)
    {
      $targetDown.css({
        opacity: 0.5,
        'box-shadow': '0px 0px 0px 4px white'
      });
    }
  });
};


setTimeout(function(){rhythmGame(30000, 2000)}, 4000);
