console.log('story script Loaded');

  var inAtmosphere = true;
  var skyStep = 0;
  var gameLength = 125;
  var flightMeterFill = 80;
  var livingAstronauts = 4;

  var chosenPenalty = undefined;
  var firstRhythmGame = undefined; //First timeout for rhythm game
  var miniGameStart = undefined; //interval for rest of mini games
  var astronautsArray = [];
  var deadAstronautsArray = [];
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

  astronautsArray = [astronaut1, astronaut2, astronaut3, astronaut4];
  deadAstronautsArray = [];
  for (var i = 0; i < astronautsArray.length; i++)
  {
    if (astronautsArray[i].alive === false)
    {
      deadAstronautsArray.push(astronautsArray[i]);
    }
  }

  generateNewspaper(livingAstronauts,deadAstronautsArray,penaltyText.biologyExperiments[4].alive,penaltyText.spaceHamsters[4].alive);
}

function generateNewspaper(livingAstronauts,deadAstronautsArray,bio,hamster){

   var createArticleText = function(){
    for (var i = 0; i<deadAstronautsArray.length; i++)
    {
      var randomWord = Math.floor(Math.random() * articleAdjective.length);

      var snippet = '\n'+articleAdjective[randomWord] + ' ' + deadAstronautsArray[i].background + ' ' + deadAstronautsArray[i].name + '('+deadAstronautsArray[i].age+') was a ' +
      articleNoun[randomWord] + ' to the people of ' + deadAstronautsArray[i].nationality +'. At a ' + articleEvent[randomWord] + ', ' + deadAstronautsArray[i].name +
      ' was quoted as saying ' + deadAstronautsArray[i].quote;

      articleAdjective = articleAdjective.splice(randomWord, 1);
      articleNoun = articleNoun.splice(randomWord, 1);
      articleEvent = articleEvent.splice(randomWord, 1);

      articleString += snippet;
    }
  }

  if (livingAstronauts === 0)
  {
    headlineString = "Shuttle Disaster!";
    sidebar1String = "Nations in mourning";
    sidebar2String = "The President Speaks";
    sidebar3String = "Bucky the Hamster Dies During Shuttle Mission";
    articleString = "On a windy afternoon in Texas, the Space Shuttle Panoglin was seen falling to Earth as it re-entered the Earth's atmosphere after a two week mission aboard the International Space Station. All astronauts on board were lost. The events surrounding the tragic end to the mission are still under investigation by NASA, who witnessed a similar disaster in 2003 with the Shuttle Columbia. Along with the crew, the Pangolin was also lost vital research on a cure to the common cold, as well as the beloved space hamster and national icon, Bucky.";
    createArticleText();
  } else if (livingAstronauts === 4)
  {
    headlineString = "Local Cat Claws President";
    sidebar1String = "Sports Game Delay Causes Riot.";
    articleString = "The President received an unpleasant surprise today following a visit by local kitten Purry Purringtons during the president's weekly reality-show themed broadcast to the nation. The secret service was immediately ushered the president back to his gold-encrusted compound deep underground a not-unmarked skyscraper in Atlantic City. The current whereabouts of the kitten are unknown, but following his encounter with the Purry Purringtons the president had this to say: “That cat is a disgrace. A low-life. I have fifty-nine show-dogs. They work for me. Dogs are the best. Let me tell you.”";
      if (hamster)
            {
              sidebar2String = "Bucky the Hamster Returns from Space!";
            } else if (!hamster)
            {
              sidebar2String = "Bucky the Hamster Perishes During Shuttle Mission.";
            }
      if (bio)
            {
              sidebar3String = "Vaccine Developed on Shuttle Shows Promise";
            } else if (!bio)
            {
              sidebar3String = "Pokemon GO Leading Cause of Cancer, Study Finds";
            }
  } else {


    switch (livingAstronauts)
    {
      case 3:
      {
        headlineString = "Astronaut Killed During Mission!";
        sidebar1String = "Nation in Mourning";
        articleString = "An astronaut was killed early this afternoon during the Space Shuttle Pangolin's return to Earth following a two week research mission at the International Space Station. The events surrounding the astronaut's death are still unclear, but NASA reports that the shuttle experienced a “critical failure” during re-entry and the rest of the crew is unharmed. This is NASA's most recent tragedy during a space mission following the 2003 Space Shuttle Columbia Disaster. A full investigation is under way.";
        createArticleText();
        if (hamster)
          {
            sidebar2String = "Bucky the Hamster Returns from Space!";
          } else if (!hamster)
          {
            sidebar2String = "Bucky the Hamster Perishes During Shuttle Mission";
          }
        sidebar3String = "Wookie Discovered in Texas!";
        break
      }
      case 2:
      {
        headlineString = "Astronauts Killed During Mission!"
        sidebar1String = "Nations in Mourning"
        articleString = "Two astronauts were killed early this afternoon during the Space Shuttle Pangolin's return to Earth following a two week research mission at the International Space Station. The events surrounding the astronauts' death are still unclear, but NASA reports that the shuttle experienced a “critical failure” during re-entry and the rest of the crew is unharmed. This is NASA's most recent tragedy during a space mission following the 2003 Space Shuttle Columbia Disaster. A full investigation is under way.";

        createArticleText();
        if (hamster)
          {
            sidebar2String = "Bucky the Hamster Returns from Space!"
          } else if (!hamster)
          {
            sidebar2String = "Bucky the Hamster Perishes During Shuttle Mission"
          }

        sidebar3String = "Wookie Discovered in Texas!"
      }
      case 1:
      {
        headlineString = "Astronauts Killed During Mission!"
        sidebar1String = "Nations in Mourning"
        articleString = "Three astronauts were killed early this afternoon during the Space Shuttle Pangolin's return to Earth following a two week research mission at the International Space Station. The events surrounding the astronauts' death are still unclear, but NASA reports that the shuttle experienced a “critical failure” during re-entry and the rest of the crew is unharmed. This is NASA's most recent tragedy during a space mission following the 2003 Space Shuttle Columbia Disaster. A full investigation is under way.";

        createArticleText();
        if (hamster)
          {
            sidebar2String = "Bucky the Hamster Returns from Space!"
          } else if (!hamster)
          {
            sidebar2String = "Bucky the Hamster Perishes During Shuttle Mission"
          }
        sidebar3String = "Wookie Discovered in Texas!"
        break
      }
    }
    //'Adjective' + BACKGROUND + NAME +, was a + ADJECTIVE NOUN + to the people of + NATION. At a + EVENT + in PLACE,
    //NAME was quoted as saying + QUOTE.

  }



    console.log(articleString);

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




