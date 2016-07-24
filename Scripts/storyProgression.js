console.log('story script Loaded');

  var inAtmosphere = true;
  var gameLength = 125;
  var flightMeterFill = 80;
  var penalties = ['biologyExperiments','spaceHamsters','rollJets','yawJets','powerCapacitors','aeronauticStabilizers']
  var livingAstronauts = 4;

  var chosenPenalty = undefined;

$(document).ready(function(){
console.log('Story... check!');


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
  penaltyText.biologyExperiments[4].alive = false;
}

function spaceHamsters(){
  console.log('Space hamsters lost');
  penaltyText.spaceHamsters[4].alive = false;
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
//Goal is to get sky Bottom: 40 ||| ground top: 60
  //So there are 240 Steps to make
  //240 at 0.5/sec = 8 minutes = setInterval 2000ms
  //240 at 1/sec = 4 minutes = 1000ms
  //240 at 2/sec = 2 minutes = 500ms
  //240 at 4/sec = 1 minute = 250ms





function startMainGame(gameLength, miniGameInterval, miniGameLength)
{
  console.log('Main game starting!');

  //Reset values
  skyPitch = -200;
  groundPitch = 300;
  inAtmosphere = true;
  endGame = false;
  $sky.css({
      'bottom': '-200vh'
    })
    $ground.css({
      'top': '300vh'
    })

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

    if (!endGame)
      {
        winGame();
        endGame = true;
      }

    }
  }
}, gameLength);

}

function logDeath(who){
  livingAstronauts--;
  $('#portrait'+who).addClass('dead');
  $('#portrait'+who+' img').attr('src', 'https://upload.wikimedia.org/wikipedia/commons/8/88/Creative-Tail-danger.svg');


  switch (who)
  {
    case 1:
    {
      astronaut1.alive = false;
      break
    }
    case 2:
    {
      astronaut2.alive = false;
      break
    }
    case 3:
    {
      astronaut3.alive = false;
      break
    }
    case 4:
    {
      astronaut4.alive = false;
      break
    }
  }
}

function endOfGameReport(){


  console.log('Astronaut1 is alive? '+astronaut1.alive);
  console.log('Astronaut2 is alive? '+astronaut2.alive);
  console.log('Astronaut3 is alive? '+astronaut3.alive);
  console.log('Astronaut4 is alive? '+astronaut4.alive);
  console.log('Cure for Common Cold is alive? '+penaltyText.biologyExperiments[4].alive);
  console.log('Space Hampster alive?'+penaltyText.spaceHamsters[4].alive);


  generateNewspaper(livingAstronauts,astronaut1.alive,astronaut2.alive,astronaut3.alive,astronaut4.alive,penaltyText.biologyExperiments[4].alive,penaltyText.spaceHamsters[4].alive );
}

function generateNewspaper(livingAstronauts, a1,a2,a3,a4,bio,hamster){

  if (livingAstronauts === 0)
  {
    headlineString = "Shuttle Disaster!";
    sidebar1 = "Nations in mourning";
    sidebar2 = "The President Speaks";
    sidebar3 = "Bucky the Hamster Dies During Shuttle Mission";

  } else if (livingAstronauts === 4)
  {
    headlineString = "Wookie Discovered in Texas!";
    sidebar1String = "Sports Game Delay Causes Riot.";
      if (hamster)
            {
              sidebar2String = "Bucky the Hamster Returns from Space!";
            } else if (!hamster)
            {
              sidebar2String = "Bucky the Hamster Dies During Shuttle Mission.";
            }
      if (bio)
            {
              sidebar3String = "Vaccine Developed on Shuttle Shows Promise";
            } else if (!bio)
            {
              sidebar3String = "Cancer May Cause Cancer, Study Finds";
            }
  } else {


    switch (livingAstronauts)
    {
      case 1:
      {
        headlineString = "Astronaut Killed During Mission!";
        sidebar1String = "Nation in Mourning";
        if (hamster)
          {
            sidebar2String = "Bucky the Hamster Returns from Space!";
          } else if (!hamster)
          {
            sidebar2String = "Bucky the Hamster Dies During Shuttle Mission";
          }
        sidebar3String = "Wookie Discovered in Texas!";
        break
      }
      case 2:
      {
        headlineString = "Astronauts Killed During Mission!"
        sidebar1String = "Nations in Mourning"
        if (hamster)
          {
            sidebar2String = "Bucky the Hamster Returns from Space!"
          } else if (!hamster)
          {
            sidebar2String = "Bucky the Hamster Dies During Shuttle Mission"
          }

        sidebar3String = "Wookie Discovered in Texas!"
      }
      case 3:
      {
        headlineString = "Astronauts Killed During Mission!"
        sidebar1String = "Nations in Mourning"
        if (hamster)
          {
            sidebar2String = "Bucky the Hamster Returns from Space!"
          } else if (!hamster)
          {
            sidebar2String = "Bucky the Hamster Dies During Shuttle Mission"
          }
        sidebar3String = "Wookie Discovered in Texas!"
        break
      }
    }
  }



  loadNewsPaper();
}

function winGame(){
  startUpdate(0);
  $('body').empty();
   endOfGameReport();
}

function loseGame(){
  livingAstronauts = 0;
  astronaut1.alive = false;
  astronaut2.alive = false;
  astronaut3.alive = false;
  astronaut4.alive = false;
  penaltyText.biologyExperiments[4].alive = false;
  penaltyText.spaceHamsters[4].alive = false;
  startUpdate(0);
  $('body').empty();
  endOfGameReport();
}




