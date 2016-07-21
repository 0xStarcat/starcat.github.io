 var $arrowSpawner = $('#arrowSpawner');
 var $spawn1 = $('#q1');
 var $spawn2 = $('#q2');
 var $spawn3 = $('#q3');
 var $spawn4 = $('#q4');

$('document').ready(function(){

  console.log('Rhythm game... standing by!');

});

var createArrow = function(direction){

  if (direction === 'left')
    {
      var leftArrow = $('<div class="arrow" id="left"></div>');
      $spawn1.append(leftArrow);
    }
  else if (direction === 'up')
  {
    var upArrow = $('<div class="arrow" id="up"></div>');
    $spawn2.append(upArrow);
  }
  else if (direction === 'down')
  {
    var downArrow = $('<div class="arrow" id="down"></div>');
    $spawn3.append(downArrow);
  }

  else if (direction === 'right')
  {
    var rightArrow = $('<div class="arrow" id="right"></div>');
    $spawn4.append(rightArrow);
  }

};

new createArrow('up');
new createArrow('left');
new createArrow('right');
new createArrow('down');
