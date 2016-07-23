 var $arrowSpawner = $('#arrowSpawner');

 var $rhythmZone = $('#rhythmZone');
 var arrows = ['Left','Up','Down','Right'];
 var miniGameCounter = 5;
 var miniGameActive = false;
 var arrowSpeed = 2000; //2 seconds to bottom of screen;
 var rhythmZoneTop = $rhythmZone.position().top;
 var rhythmZoneBottom = $rhythmZone.position().top + $rhythmZone.innerHeight();
 var createRhythmZone = $('<div class ="spawnBox rhythm" id="pLeft"><div class="arrow arrowBackground rhythm" id="phLeft"></div><div class="arrow rhythm" id="Left"></div></div><div class ="spawnBox rhythm" id="pUp"><div class="arrow arrowBackground rhythm" id="phUp"></div><div class="arrow rhythm" id="Up"></div></div><div class ="spawnBox rhythm" id="pDown"><div class="arrow arrowBackground rhythm" id="phDown"></div><div class="arrow rhythm" id="Down"></div></div><div class ="spawnBox rhythm" id="pRight"><div class="arrow arrowBackground rhythm" id="phRight"></div><div class="arrow rhythm" id="Right"></div></div>');
    $($rhythmZone).append(createRhythmZone);
    addRhythmListeners();
    $rhythmZone.hide();

 var chosenAstronaut = -1;
 var someoneChosen = true;

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


//Win/Lose conditions for Mini-game set here
function checkCounter(){
     if (miniGameCounter <= 0 && miniGameActive)
    {
      console.log('Lost Mini-Game');
      $('#portrait'+chosenAstronaut).addClass('dead');
      $('#portrait'+chosenAstronaut+' img').attr('src', 'https://upload.wikimedia.org/wikipedia/commons/8/88/Creative-Tail-danger.svg');
      clearGame();
      miniGameConsequence('fail');
    } else if (miniGameCounter > 0 && !miniGameActive){
      miniGameConsequence('success');
      clearGame();
    }

}

var rhythmGame = function(length, speed){
  miniGameActive = true;
  someoneChosen = false;

  //Display penalty text
  setPenaltyText();

  setTimeout(function(){

    $rhythmZone.show();

    $portraits.show();

    var countDown = 10;
    var countDownTeammate = setInterval(function(){
     countDown--;
     $textNotification.text('Send a teammate to fix? (use arrows) '+countDown)


      if (someoneChosen === true)
      {
      clearInterval(countDownTeammate);
      $textNotification.text("");
      rainOfArrows(length, speed);
      } else if (countDown < 0 && someoneChosen === false)
      {
        clearInterval(countDownTeammate);
        $textNotification.text("");
        miniGameConsequence('fail');
        clearGame();
        $portraits.hide();
      }
    }, 1000)

  }, 4000)


  //First show portraits of astronauts.





}

function rainOfArrows(length, speed){

  if (someoneChosen === false)
  {
    clearTimeout(rainOfArrows);
  }

  $portraits.hide();

  $textNotification.css({
        'opacity' : '0'
      });

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
      createArrow(arrows[randomNumber], arrowSpeed);
      //console.log(arrows[randomNumber])
    }, arrowSpeed);

    //End the mini-game by clearing thimeout.
    setTimeout(function(){
       clearInterval(rhythmGameRun);
       miniGameActive = false;
       checkCounter();
       clearGame();
    }, length);

}


function clearGame(){

    $angleBox.css({
    'box-shadow': '0px 0px 0px 0px rgba(255, 255, 255, 0.5)'
    });
    // $('.rhythm').each(function(){
    //   this.remove();
    // });

    $rhythmZone.hide();
    miniGameActive = false;
    //checkCounter();
}

function addRhythmListeners(){

 var $targetLeft = $('#phLeft');
 var $targetUp = $('#phUp');
 var $targetDown = $('#phDown');
 var $targetRight = $('#phRight');

  $(window).on('keydown', function(e){
    if (e.keyCode === 37 || e.which === 37) //left
    {
      $targetLeft.css({
        opacity: 1,
        'box-shadow': '0px 0px 0px 8px white'
      });

        if (someoneChosen === false)
        {
          chosenAstronaut = 0;
          someoneChosen = true;
          console.log(chosenAstronaut + someoneChosen)
        }

    } else if (e.keyCode === 38 || e.which === 38) //up
    {
      $targetUp.css({
        opacity: 1,
        'box-shadow': '0px 0px 0px 8px white'
      });
         if (someoneChosen === false)
        {
          chosenAstronaut = 1;
          someoneChosen = true;
        }

    } else if (e.keyCode === 39 || e.which === 39) //right
    {
      $targetRight.css({
        opacity: 1,
        'box-shadow': '0px 0px 0px 8px white'
      });
         if (someoneChosen === false)
        {
          chosenAstronaut = 3;
          someoneChosen = true;
        }
    } else if (e.keyCode === 40 || e.which === 40) //down
    {
      $targetDown.css({
        opacity: 1,
        'box-shadow': '0px 0px 0px 8px white'
      });

         if (someoneChosen === false)
        {
          chosenAstronaut = 2;
          someoneChosen = true;
        }
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
}


// setTimeout(function()
// {
//   rhythmGame(30000)
//   setPenaltyText();
// }, 4000);
