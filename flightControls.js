

var targetX = 47.5;
var targetY = 47.5;
var indicatorX = 50;
var indicatorY = 50;

var targetLeft = 0;
var targetRight = 0;
var targetTop = 0;
var targetBottom = 0;

var isOnTarget = true;

var indicatorCenterX = undefined;
var indicatorCenterY = undefined;
var aLeft = false;
var wUp = false;
var dRight = false;
var sDown = false;

var skyRotate = 0;
var groundRotate = 0;
var skyPitch = -200;  //bottom 40 for showcase //-200 for game
var groundPitch = 300; //top 60               //300 for game

//Speeds
var targetSpeedX = 0.25;
var targetSpeedY = 0.4;
var rotateSpeed = 0.8;
var equilibriumSpeed = 0.5;
var ySpeed = 0.4;

var debug = false;

var $sky = $('#sky');
var $ground = $('#ground');
var $cockpit = $('#cockpit');
var $angleBox = $('#angleTargetBox');
var $angleIndicator = $('#angleIndicator');

$(document).ready(function(){
console.log('Flight Controls... check!');

var setEventListeners = function()
  {
    $(window).on('keydown', function(e){
      if (e.keyCode === 65 || e.which === 65)
      {
        //console.log('A button down');
        aLeft = true;
      }
      if (e.keyCode === 87 || e.which === 87)
      {
        //console.log('W button down');
        wUp = true;
      }
      if (e.keyCode === 68 || e.which === 68)
      {
        //console.log('D button down');
        dRight = true;
      }
      if (e.keyCode === 83 || e.which === 83)
      {
        //console.log('s button down');
        sDown = true;
      }
    });

    $(window).on('keyup', function(e){
      if (e.keyCode === 65 || e.which === 65)
      {
        //console.log('A button Up');
        aLeft = false;
      }
      if (e.keyCode === 87 || e.which === 87)
      {
        //console.log('W button Up');
        wUp = false;
      }
      if (e.keyCode === 68 || e.which === 68)
      {
        //console.log('D button Up');
        dRight = false;
      }
      if (e.keyCode === 83 || e.which === 83)
      {
        //console.log('s button Up');
        sDown = false;
      }
    })
  }
  setEventListeners();

});

function moveTargetZone(){
//#######
//Moving the Target Zone
//#######
  var movementMax = 2; //px
  var moveCalcX = (Math.random() * movementMax) - (movementMax/2);
  var moveCalcY = (Math.random() * movementMax) - (movementMax/2);

  targetX+=moveCalcX;
  targetY+=moveCalcY;
  $angleBox.css({
  'top': targetY+'vh',
  'left': targetX+'vw'
  });
}

function controlShuttle() {

//########
//Moving the Shuttle
//########

  if (aLeft === true)
  {
    targetX+=targetSpeedX;
    $angleBox.css({
    'left': targetX+'vw'
    });

    skyRotate+=rotateSpeed;
    groundRotate+=rotateSpeed;
    $sky.css({
    'transform': 'rotate('+skyRotate+'deg)',
    });
    $ground.css({
    'transform': 'rotate('+groundRotate+'deg)',
    });
  }

  if (wUp === true)
  {
    targetY+=targetSpeedY;
    $angleBox.css({
    'top': targetY+'vh'
    });

    skyPitch-=ySpeed;
    groundPitch+=ySpeed;
    $sky.css({
    'bottom': skyPitch+'vh'
    });
    $ground.css({
    'top': groundPitch+'vh'
    });
  }

  if (dRight === true)
  {
    targetX-=targetSpeedX;
    $angleBox.css({
    'left': targetX+'vw'
    });

    skyRotate-=rotateSpeed;
    groundRotate-=rotateSpeed;
    $sky.css({
    'transform': 'rotate('+skyRotate+'deg)',
    });
    $ground.css({
    'transform': 'rotate('+groundRotate+'deg)',
    });
  }
  if (sDown === true)
  {
    targetY-=targetSpeedY;
    $angleBox.css({
    'top': targetY+'vh'
    });

    skyPitch+=ySpeed;
    groundPitch-=ySpeed;
    $sky.css({
    'bottom': skyPitch+'vh'
    });
    $ground.css({
    'top': groundPitch+'vh'
    });
  }

}

function trackCoordinates(){

  //#######
  //Finding Center
  //#######
  indicatorCenterX = $angleIndicator.position().left + ($angleIndicator.innerWidth() / 2);
  indicatorCenterY = $angleIndicator.position().top + ($angleIndicator.innerHeight() / 2);
  targetLeft = $angleBox.position().left;
  targetRight = ($angleBox.position().left + $angleBox.innerWidth());
  targetTop = $angleBox.position().top;
  targetBottom = ($angleBox.position().top + $angleBox.innerHeight());
}

function onTarget(){

//########
//Checking for Indicator on Target
//########

  if (debug)
  {
    console.log('Center Y: '+indicatorCenterY);
    console.log('Center X: '+indicatorCenterX);
    console.log('Top: '+ targetTop + ' Bottom: '+targetBottom);
    console.log('Left: '+ targetLeft + ' Right: ' + targetRight);
  }


  if (indicatorCenterX > targetLeft && indicatorCenterX < targetRight && indicatorCenterY > targetTop && indicatorCenterY < targetBottom)
  {
      if (debug)
      {
         console.log('on Target')
      }
      isOnTarget = true;
      $angleBox.css({
        'background-color' : 'rgba(255, 150, 150, 0.5)'
      });

  } else {
    isOnTarget = false;
    $angleBox.css({
        'background-color' : 'transparent'
      });

  }

}

function rotationEquilibrium(){
  //#######
  //Return rotation to equilibrium (0) gradually always
  //#######
  if (groundRotate > 0.1 || groundRotate < -0.1)
  {
    //console.log('Rotation: '+groundRotate)
    if (groundRotate > 0.1)
    {
      groundRotate -=equilibriumSpeed;
      skyRotate -=equilibriumSpeed;
      //console.log('decreasing Rotation')

      $sky.css({
      'transform': 'rotate('+skyRotate+'deg)',
      });
      $ground.css({
      'transform': 'rotate('+groundRotate+'deg)',
      });
        if (groundRotate < 0.2)
        {
          $sky.css({
          'transform': 'rotate(0deg)',
          });
          $ground.css({
          'transform': 'rotate(0deg)',
          });
          //console.log('Centralizing');
        }

    } else if (groundRotate < -0.1){
        groundRotate +=equilibriumSpeed;
        skyRotate +=equilibriumSpeed;
        //console.log('increasing Rotation')

        $sky.css({
        'transform': 'rotate('+skyRotate+'deg)',
        });
        $ground.css({
        'transform': 'rotate('+groundRotate+'deg)',
        });

          if (groundRotate > -0.2)
          {
            $sky.css({
            'transform': 'rotate(0deg)',
            });
            $ground.css({
            'transform': 'rotate(0deg)',
            });

            //console.log('Centralizing');
          }
      }
  }
}

function clampRoll(){

  if (groundRotate > 50)
  {
    groundRotate = 50;
    skyRotate = 50;
  } else if (skyRotate < -50){

    groundRotate = -50;
    skyRotate = -50;
  }
}

function clampPitch(){

  if (groundPitch > 200)
  {
    groundPitch = 200;
    skyPitch = -100;
  } else if (groundPitch < 0){

    groundPitch = 0;
    skyPitch = 100;
  }
}

function cockpitRumble(){
  //######
  //Randomize rumble amounts.
  //######
  var rumbleMax = 2; //px
  var rumbleCalcX = (Math.random() * rumbleMax) - (rumbleMax/2);
  var rumbleCalcY = (Math.random() * rumbleMax) - (rumbleMax/2);

  $cockpit.animate({
    'top': '-'+rumbleCalcY+'vh',
    'left' : '-'+rumbleCalcX+'vw'
  },25)
  .animate({
    'top': '-2vh',
    'left' : '-2vw'
  },25);
}
