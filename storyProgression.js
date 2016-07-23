console.log('story script Loaded');

  var inAtmosphere = true;
  var gameLength = 125;
  var flightMeterFill = 80;

  var $textNotification = undefined;
  var $flightMeterInner = $('#flightMeterInner');
  var $portraitZone = $('#portraitZone');
  var $portraits = $('<div class="portraitContainer id="portrait0""><img class="portrait" src="http://icons.iconarchive.com/icons/iconshock/real-vista-jobs/256/astronaut-icon.png"></div><div class="portraitContainer"id="portrait1"><img class="portrait" src="http://icons.iconarchive.com/icons/iconshock/real-vista-jobs/256/astronaut-icon.png"></div><div class="portraitContainer" id="portrait2"><img class="portrait" src="http://icons.iconarchive.com/icons/iconshock/real-vista-jobs/256/astronaut-icon.png"></div><div class="portraitContainer" id="portrait3"><img class="portrait" src="http://icons.iconarchive.com/icons/iconshock/real-vista-jobs/256/astronaut-icon.png"></div>');
    $portraitZone.append($portraits);
    $portraits.hide();

  // var penaltyFunctions = [aeronauticStabilizers];
  // var penalties = ['aeronauticStabilizers']
  //var penaltyFunctions = [biologyExperiments,spaceHamsters,rollJets,yawJets,powerCapacitors,aeronauticStabilizers]
  var penalties = ['biologyExperiments','spaceHamsters','rollJets','yawJets','powerCapacitors','aeronauticStabilizers']


  var chosenPenalty = undefined;

$(document).ready(function(){
console.log('Story... check!');

  $textNotification = $('#textNotification');
});

var setPenaltyText = function(){
  chosenPenalty = Math.floor(Math.random() * penalties.length)
  console.log(String(penalties[chosenPenalty]));
  $textNotification.text(penaltyText[penalties[chosenPenalty]][0]);

  $textNotification.animate({
    'opacity': '1'
  }, 2000);

  // , function(){

  //   setTimeout(function(){

  //     $textNotification.css({
  //       'opacity' : '0'
  //     })
  //   }, 4000)
  // });


}

function miniGameConsequence(result){

  //var removePenaltyAt = penalties.indexOf(penalties[chosenPenalty]);

  if (result === 'success')
  {
    console.log('showing success text');
    $textNotification.text(penaltyText[penalties[chosenPenalty]][2]);

    $textNotification.animate({
    'opacity': '1'
  }, 2000, function(){

    setTimeout(function(){

      $textNotification.css({
        'opacity' : '0'
      })
    // Remove penalty from list
      //penaltyFunctions.splice(chosenPenalty, 1);
      penalties.splice(chosenPenalty, 1);
      console.log(penalties);
    }, 500)
  });

  } else if (result ==='fail') {
    console.log('showing failure text');
    $textNotification.text(penaltyText[penalties[chosenPenalty]][1]);

    //Call consequence failure function
    penaltyText[penalties[chosenPenalty]][3]();

    $textNotification.animate({
    'opacity': '1'
  }, 2000, function(){

    setTimeout(function(){

      $textNotification.css({
        'opacity' : '0'
      })
       // Remove penalty from list
      //penaltyFunctions.splice(chosenPenalty, 1);
      penalties.splice(chosenPenalty, 1);
      console.log(penalties);
    }, 4000)
  });

  }

}
//#######
//Failure Consequence Functions
//#######

function biologyExperiments(){
  console.log('Bio experiments destroyed');
}

function spaceHamsters(){
  console.log('Space hamsters lost');
}

function rollJets(){
  console.log('slowing X speed');
  targetSpeedX = 0.15;
  rotateSpeed = 0.2;
}

function yawJets(){
  console.log('slowing Y speed');
  targetSpeedY = 0.15;
  ySpeed = 0.1;
}

function powerCapacitors(){

  var randomFlickering = Math.floor(Math.random() * 1000);
  var randomOpacity = Math.random();
  var randomColor = Math.floor(Math.random() * 255);
  console.log('flickering HUD');
  $('.hud').animate({
    'opacity' : '0.01'
  }, randomFlickering)
  .animate({
    'opacity' : randomOpacity,
    'background-color' : 'rgba('+randomColor+','+randomColor+','+randomColor+',1)'
  },randomFlickering, function() {powerCapacitors();});
}

function aeronauticStabilizers(){

movementMax = 4;
unstableCockpit = true;
}

//See chart below for guide to setting gameLength.
//miniGameInterval is how many MS between mini-games.
//miniGame Length is how long the miniGame lasts.
//See chart in oneNote document for mini-game interval and length guide

function startMainGame(gameLength, miniGameInterval, miniGameLength)
{
  console.log('Main game starting!');

  var miniGameStart = setInterval(function(){
    rhythmGame(miniGameLength)
  },miniGameInterval);


//########
//Move sky and ground over time. When ground is seen, game is won.
//########
//gameLength Guide#############
 //sky starts at Bottom: -200 ||| ground starts at Top: 300
  //Goal is to get sky Bottom: 40 ||| ground top: 60
  //So there are 240 Steps to make
  //240 at 0.5/sec = 8 minutes = setInterval 2000ms
  //240 at 1/sec = 4 minutes = 1000ms
  //240 at 2/sec = 2 minutes = 500ms
  //240 at 4/sec = 1 minute = 250ms
  var shiftLandscape = setInterval(function() {


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
startMainGame(500, 30000, 15000);

