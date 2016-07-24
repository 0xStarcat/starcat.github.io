console.log('story script Loaded');

  var inAtmosphere = true;
  var skyStep = 0;
  var gameLength = 125;
  var flightMeterFill = 80;
  var livingAstronauts = 4;

  var chosenPenalty = undefined;
  var firstRhythmGame = undefined; //First timeout for rhythm game
  var miniGameStart = undefined; //interval for rest of mini games
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
//Sky starts at -280
//Goal is to get sky Bottom: 30 ||| ground top: 60
  //So there are 250 steps to make with game updating every 50ms
  //20 updates per second @ 50ms
  //Set game length using skyStep variable - this is the amount the sky moves with each update frame
  //skyStep = 0.11 = 3 minutes of gameplay

  //240 at 0.5/sec = 8 minutes = setInterval 2000ms
  //240 at 1/sec = 4 minutes = 1000ms
  //240 at 2/sec = 2 minutes = 500ms
  //240 at 4/sec = 1 minute = 250ms





function startMainGame(gameLength, miniGameInterval, miniGameLength)
{
  console.log('Main game starting!');




  firstRhythmGame = setTimeout(function(){
    //trigger first after 10 seconds
    rhythmGame(miniGameLength);


    //Then start regular interval
    miniGameStart = setInterval(function(){
    rhythmGame(miniGameLength)
  },miniGameInterval);

  },10000)



//Only change this value when ready to start moving the sky. The function startLanding() is being called constantly
//from update() with skyStep at 0 meaning no movement.
  skyStep = gameLength;




}

function startLanding(){
//Called every 50ms from update();

  if (inAtmosphere)
  {
    skyPitch+=skyStep;
    // groundPitch-=1;
    $sky.css({
      'bottom': skyPitch+'vh'
    });

    // $ground.css({
    //   'top': groundPitch+'vh'
    // });

    // sky 40, ground 60
    if (skyPitch >= (-30)) //&& groundPitch <= 100)
    {
      skyPitch = -30;
      //groundPitch = 100;
      inAtmosphere = false;
      console.log('Reached Earth')

    if (!endGame)
      {
        winGame();
        endGame = true;
      }

    }
  }


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
    sidebar1String = "Nations in mourning";
    sidebar2String = "The President Speaks";
    sidebar3String = "Bucky the Hamster Dies During Shuttle Mission";

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
              sidebar3String = "Falling in Love Causes Cancer, Study Finds";
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
  clearInterval(miniGameStart);
  clearTimeout(firstRhythmGame);
  clearGame();

    $textNotification.animate({
      'opacity': '1'
    }, 1000);
    $textNotification.text('Welcome Home!');

    $('body').animate({
      'opacity' : '0'
    },6000, function(){
      startUpdate(0); //stop Update
      $('body').empty();
      endOfGameReport();
      $('body').css('opacity', '1');
      $textNotification.css('opacity','0');
    });
}

function loseGame(){
  livingAstronauts = 0;
  astronaut1.alive = false;
  astronaut2.alive = false;
  astronaut3.alive = false;
  astronaut4.alive = false;
  penaltyText.biologyExperiments[4].alive = false;
  penaltyText.spaceHamsters[4].alive = false;

  $angleBox.css('opacity', '0');
  $('.meter').css('opacity', '0');

  clearInterval(miniGameStart);
  clearTimeout(firstRhythmGame);
  clearGame();

   $textNotification.animate({
      'opacity': '1'
    }, 1000);
    $textNotification.text('The crew compartment is breaking up!');
    rumbleMax = 10;
    unstableCockpit = true;
    rotateCockpitMax = 10;

    $('#skyGradient').css('background', 'rgba(255, 100, 100, 0.5)')

    $('body').animate({

      'opacity':'0'
    },6000, function(){
      startUpdate(0); //stop Update
      $('body').empty();
      endOfGameReport();
      $('body').css('opacity', '1');
      $textNotification.css('opacity','0');
    });
}




