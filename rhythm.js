 var $arrowSpawner = $('#arrowSpawner');
 var $targetLeft = $('#phBack1');
 var $targetUp = $('#phBack2');
 var $targetDown = $('#phBack3');
 var $targetRight = $('#phBack4');
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

  var arrow = $('<div class="arrow arrowBackground"></div><div class="arrow" id='+direction+'></div>');

    $('#q'+direction).append(arrow);

    var arrowCenter = (arrow.position().top + arrow.innerHeight() / 2)


    $(window).on('keydown', function(e){
      if (e.keyCode === theKey || e.which === theKey)
      {
        console.log(direction+' pressed. ARROW CENTER = '+(arrow.position().top + arrow.innerHeight() / 2)+' ZONE BOTTOM = '+rhythmZoneBottom+ ' ZONE TOP = '+rhythmZoneTop)
        if ((arrow.position().top + arrow.innerHeight() / 2) <= rhythmZoneBottom && (arrow.position().top + arrow.innerHeight() / 2) >= rhythmZoneTop)
        {
          console.log(direction+' arrow in Rhythm!');
          arrow.remove();
        } else {
          console.log(direction+' Off rhythm!');
          miniGameCounter--;
          $angleBox.css({
            'box-shadow': '0px 0px 0px '+miniGameCounter+'0px rgba(255, 255, 255, 0.5)'
          });
        }
      }
    });

  arrow.animate({
        'top': '100vh'
      }, speed, function(){
        arrow.remove();
        $(window).off('keydown');
      });

};



var rhythmGame = function(length, speed){

//#######
//Create arrows at set intervals (speed) for a duration (length)
//#######
miniGameCounter = 5;
$angleBox.css({
            'box-shadow': '0px 0px 0px 50px rgba(255, 255, 255, 0.5)'
          });

  var rhythmGameRun = setInterval(function()
  {
    var randomNumber = Math.floor(Math.random() * arrows.length)
    createArrow(arrows[randomNumber], speed);
    console.log(arrows[randomNumber])
  }, speed);
  setTimeout(function(){
  clearTimeout(rhythmGameRun);
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

rhythmGame(30000, 2000);
