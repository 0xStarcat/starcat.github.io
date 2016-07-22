 var $arrowSpawner = $('#arrowSpawner');

 var $rhythmZone = $('#rhythmZone');
 var arrows = ['Left','Up','Down','Right'];
 var miniGameCounter = 5;
 var miniGameActive = false;

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
if (miniGameActive)
{
  var arrow =  $('<div class="arrow arrowBackground"></div><div class="arrow" id='+direction+'></div>');

    $('#q'+direction).append(arrow);

    var windowKeyEvent = $(window).on('keydown', function(e)
    {
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
            delete windowKeyEvent;
            delete arrow;
             //$(window).off('keydown');
          } else if (arrow.position().top >= rhythmZoneTop - 300){
            //console.log(direction+' #####Off rhythm!######');
            miniGameCounter-=0.5;
            checkCounter();
            $angleBox.css({
              'box-shadow': '0px 0px 0px '+miniGameCounter*10+'px rgba(255, 255, 255, 0.5)'
            });
            isActive = false;

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

        arrow.remove();
        //$(window).off('keydown');
        isActive=false;
        delete windowKeyEvent;
        delete arrow;
        if (miniGameActive)
        {
          miniGameCounter-=0.5;
          checkCounter();
          $angleBox.css({
            'box-shadow': '0px 0px 0px '+miniGameCounter*10+'px rgba(255, 255, 255, 0.5)'
        });
        }
      });
  }
};

function checkCounter(){
     if (miniGameCounter <= 0 && miniGameActive)
    {
      console.log('Lost Mini-Game');

      clearGame();
      showConsequence('fail');
    } else if (miniGameCounter > 0 && !miniGameActive){
      showConsequence('success');
    }

}

var rhythmGame = function(length, speed){
  miniGameActive = true;
  var createRhythmZone = $('<div class ="spawnBox" id="pLeft"><div class="arrow arrowBackground" id="phLeft"></div><div class="arrow" id="Left"></div></div><div class ="spawnBox" id="pUp"><div class="arrow arrowBackground" id="phUp"></div><div class="arrow" id="Up"></div></div><div class ="spawnBox" id="pDown"><div class="arrow arrowBackground" id="phDown"></div><div class="arrow" id="Down"></div></div><div class ="spawnBox" id="pRight"><div class="arrow arrowBackground" id="phRight"></div><div class="arrow" id="Right"></div></div>');
  $($rhythmZone).append(createRhythmZone);
  addRhythmListeners();

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

  //End the mini-game by clearing thimeout.
  setTimeout(function(){
     clearInterval(rhythmGameRun);
     clearGame();
  }, length);
}

function clearGame(){

    $angleBox.css({
    'box-shadow': '0px 0px 0px 0px rgba(255, 255, 255, 0.5)'
    });
    $('.arrow').each(function(){
      this.remove();
    });
    $('.arrowBackground').each(function(){
      this.remove();
    });
    miniGameActive = false;
    checkCounter();
}

function addRhythmListeners(){

 var $targetLeft = $('#phLeft');
 var $targetUp = $('#phUp');
 var $targetDown = $('#phDown');
 var $targetRight = $('#phRight');

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


setTimeout(function()
{
  rhythmGame(30000, 2000)
  setPenaltyText();
}, 4000);
