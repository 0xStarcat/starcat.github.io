console.log('story script Loaded');

  var inAtmosphere = true;
  var gameLength = 125;
  var flightMeterFill = 80;

  var $flightMeterInner = $('#flightMeterInner')

  var penalties = ['biologyExperiments','spaceMonkies','leftRoll','rightRoll','dorsalYaw','ventralYaw','powerCapacitors','aeronauticStabalizers']
  var penaltyText = {
    biologyExperiments : "",
    spaceMonkies : "",
    leftRoll : "",
    rightRoll : "",
    dorsalYaw : "",
    ventralYaw : "",
    powerCapacitors : "",
    aeronauticStabalizers : ""
  }
  var chosenPenalty = undefined;

$(document).ready(function(){
console.log('Story... check!');

});


//See chart below for guide to setting gameLength.
//miniGameInterval is how many MS between mini-games.
//miniGame Length is how long the miniGame lasts.
//See chart in oneNote document for mini-game interval and length guide

function startMainGame(gameLength, miniGameInterval, miniGameLength)
{

  var miniGameStart = setInterval(function(){

  },miniGameInterval);


//########
//Move sky and ground over time. When ground is seen, game is won.
//########
  var shiftLandscape = setInterval(function() {
    console.log('Main game starting!');
  //sky starts at Bottom: -200 ||| ground starts at Top: 300
  //Goal is to get sky Bottom: 40 ||| ground top: 60
  //So there are 240 Steps to make
  //240 at 0.5/sec = 8 minutes = setInterval 2000ms
  //240 at 1/sec = 4 minutes = 1000ms
  //240 at 2/sec = 2 minutes = 500ms
  //240 at 4/sec = 1 minute = 250ms

  if (inAtmosphere)
  {
    skyPitch+=1;
    groundPitch-=1;
    $sky.css({
      'bottom': skyPitch+'vh'
    });

    $ground.css({
      'top': groundPitch+'vh'
    });

    if (skyPitch >= 40 && groundPitch <= 60)
    {
      skyPitch = 40;
      groundPitch = 60;
      inAtmosphere = false;
      console.log('Reached Earth')
    }
  }
}, gameLength);

}

