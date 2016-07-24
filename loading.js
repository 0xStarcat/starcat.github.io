
//Start Screen
var $startButton = undefined;
var $optionsButton = undefined;
var $creditsButton = undefined;
var $startBackground = undefined;
var $backButton = undefined;


//Flight
var $sky = undefined;
var $ground = undefined;
var $cockpit = undefined;
var $angleBox = undefined;
var $angleIndicator = undefined;
var $textNotification = undefined;

var $flightMeterInner = undefined;
var $portraitZone = undefined;
var $portraits = undefined;


var $arrowSpawner = undefined;
var $rhythmZone = undefined;

var rhythmZoneTop = undefined;
var rhythmZoneBottom = undefined;
var createRhythmZone = undefined;


//MiniGame
var $leftArrows = undefined;
var $rightArrows = undefined;
var $submitButton = undefined;
var $pageNumber = undefined;
var pageNumber = undefined;
var $targetLeft = undefined;
var $targetUp = undefined;
var $targetDown = undefined;
var $targetRight = undefined;


//Character Creation
var $flagPicture = undefined;
var $charPortrait = undefined;
var $charName = undefined;
var $charNationality = undefined;
var $charAge = undefined;
var $charBackground = undefined;
var $charQuote = undefined;


$(document).ready(function(){

  console.log('Loading script... loaded!')

});

function loadStartScreen(){

  var $startScreenHTML = $('<div id="startScreenContainer"><div id="startScreenGradient"><img id="startScreenImage" src=""></div><div id="startScreenTitle">Game Title</div><div id="startFlexBox"><div class="thirds" id="firstThird"><button class= "screenButton" id="optionsButton">Options</button></div><div class="thirds" id="secondThird"><button class= "screenButton" id="startButton">Start</button></div><div class="thirds" id="finalThird"><button class= "screenButton" id="creditsButton">Credits</button></div></div></div></div>');
  $('body').append($startScreenHTML);
  $startButton = $('#startButton');
  $optionsButton = $('#optionsButton');
  $creditsButton = $('#creditsButton');
  $startBackground = $('#startScreenContainer');

  $startButton.on('click', function(){
    console.log('start button clicked!');
    $('body').animate({
      opacity : 0
    },500, function(){
       $('body').empty();
      loadCharacterCreation();
    }).animate({
      opacity : 1
    },500);


  })
  $optionsButton.on('click', function(){
    console.log('options button clicked!')

  })
  $creditsButton.on('click', function(){
    console.log('credits button clicked!')
    $('body').animate({
      opacity : 0
    },500, function(){
       $('body').empty();
    loadCreditsScreen();
    }).animate({
      opacity : 1
    },500);


  })

  animateStartScreen();
}

function loadCreditsScreen(){
  var creditScreenHTML = $('<div id="startScreenContainer"><div id="startScreenGradient"><button class="screenButton" id ="backButton">Back</button><div id="creditsScreen"><p class="creditsSpan">Made by</p><p class="creditsLine">Jeff</p><p class="creditsSpan">Cockpit Image by</p><p class="creditsLine">Justin Haynes - http://justinhaynes89.deviantart.com<br></p><p class="creditsSpan">All other images</p><p class="creditsLine">Licensed for free use without attribution<br></p></div></div></div>');
  $('body').append(creditScreenHTML);

  $backButton = $('#backButton');

  $backButton.on('click', function(){
    $('body').animate({
      opacity : 0
    },500, function(){
      $('body').empty();
      loadStartScreen();
    })
    .animate({
      opacity : 1
    },500);

  });
};





function loadMainGame(){

  var mainGameHTML = $('<div id="screenContainer"><div class="hud" id="angleTargetBox"></div><div class="hud" id="angleIndicator"></div><img id="cockpit" src = "http://orig00.deviantart.net/cf70/f/2014/202/b/e/cockpit_by_justinhaynes89-d7rp2yv.png"><!-- JustinHayes89 on DeviantArt http://justinhaynes89.deviantart.com/art/Cockpit-469783111 --><div id="sky"></div><div id="ground"></div><div class="meter hud" id="flightMeterOuter"></div><div class="meter hud" id="flightMeterInner"></div><div id="arrowSpawner"><div class ="spawnBox" id="qLeft"></div><div class ="spawnBox" id="qUp"></div><div class ="spawnBox" id="qDown"></div><div class ="spawnBox" id="qRight"></div></div><div id="rhythmZone"></div><div id="portraitZone"></div><div id = "textNotification"></div>')
  $('body').append(mainGameHTML);


  //Main game visual elements
  $sky = $('#sky');
  $ground = $('#ground');
  $cockpit = $('#cockpit');
  $angleBox = $('#angleTargetBox');
  $angleIndicator = $('#angleIndicator');
  $textNotification = $('#textNotification');

  $flightMeterInner = $('#flightMeterInner');
  $portraitZone = $('#portraitZone');
  //$portraits = $('<div class="portraitContainer" id="portrait0"><img class="portrait" src='+astronaut1.picture+'></div><div class="portraitContainer" id="portrait1"><img class="portrait" src='+astronaut2.picture+'></div><div class="portraitContainer" id="portrait2"><img class="portrait" src='+astronaut3.picture+'></div><div class="portraitContainer" id="portrait3"><img class="portrait" src='+astronaut4.picture+'></div>');
  $portraits = $('<div class="characterContainer"><div class="portraitContainer" id="portrait0"><img class="portrait" src='+astronaut1.picture+'></div><div class="nameNationality" id="name1">'+astronaut1.name+'<img class="flagIcon" id="flag1" src='+astronaut1.flag+'></div></div><div class="characterContainer"><div class="portraitContainer" id="portrait1"><img class="portrait" src='+astronaut2.picture+'></div><div class="nameNationality" id="name2">'+astronaut2.name+'<img class="flagIcon" id="flag2" src='+astronaut2.flag+'></div></div><div class="characterContainer"><div class="portraitContainer" id="portrait2"><img class="portrait" src='+astronaut3.picture+'></div><div class="nameNationality" id="name3">'+astronaut3.name+'<img class="flagIcon" id="flag3" src='+astronaut3.flag+'></div></div><div class="characterContainer"><div class="portraitContainer" id="portrait3"><img class="portrait" src='+astronaut4.picture+'></div><div class="nameNationality" id="name4">'+astronaut4.name+'<img class="flagIcon" id="flag4" src='+astronaut4.flag+'></div></div>')

    $portraitZone.append($portraits);
    $portraits.hide();


  setFlightEventListeners();

  //Rhythm-game elements

  $arrowSpawner = $('#arrowSpawner');
  $rhythmZone = $('#rhythmZone');
  rhythmZoneTop = $rhythmZone.position().top;
  rhythmZoneBottom = $rhythmZone.position().top + $rhythmZone.innerHeight();
  createRhythmZone = $('<div class ="spawnBox rhythm" id="pLeft"><div class="arrow arrowBackground rhythm" id="phLeft"></div><div class="arrow rhythm" id="Left"></div></div><div class ="spawnBox rhythm" id="pUp"><div class="arrow arrowBackground rhythm" id="phUp"></div><div class="arrow rhythm" id="Up"></div></div><div class ="spawnBox rhythm" id="pDown"><div class="arrow arrowBackground rhythm" id="phDown"></div><div class="arrow rhythm" id="Down"></div></div><div class ="spawnBox rhythm" id="pRight"><div class="arrow arrowBackground rhythm" id="phRight"></div><div class="arrow rhythm" id="Right"></div></div>');
    $($rhythmZone).append(createRhythmZone);
    $rhythmZone.hide();

  $targetLeft = $('#phLeft');
  $targetUp = $('#phUp');
  $targetDown = $('#phDown');
  $targetRight = $('#phRight');
  addRhythmListeners();

  loadPenaltyData();
  startUpdate(1);



}


// loadMainGame();
// startMainGame(500, 30000, 15000);

function loadCharacterCreation(){

  var characterCreationHTML = $('<div id="outerWrapper"><div class="sideBar"><div class="flag"></div><div class = "changePortrait" id="changeP_left"></div><div class ="left_selection emptyArrow"></div><div class ="left_selection"></div><div class ="left_selection"></div><div class ="left_selection"></div><div class ="left_selection"></div><div class ="empty"></div></div><div id="characterScreenContainer"><img class="flag" id="showFlag" src=""><div id="portraitBackground"><img class="charPortrait" src=""></div><input type=text value = "Name" class ="charName charInput"><input type=text class ="charNationality charInput" value= "Nationality" ><input type=text class ="charInput charAge" value = "< Age >"><input type=text  value ="Background" class ="charInput charBackground"><textarea name =quoteBox class ="charInput charQuote"></textarea><button id="submitAstronaut" type=submit value ="charInput Submit">Pick Astronaut</button></div><div class="sideBar"><div class="flag"></div><div class = "changePortrait" id="changeP_right"></div><div class ="right_selection emptyArrow"></div><div class ="right_selection"></div><div class ="right_selection"></div><div class ="right_selection"></div><div class ="right_selection"></div><div class ="empty"></div></div></div><div id="charScreenTitle">Choose your team</div><div id="pageNumber">1/4</div>');
  $('body').append(characterCreationHTML);


  $leftArrows = $('.left_selection');
  $rightArrows = $('.right_selection');
  $submitButton = $('#submitAstronaut');
  $pageNumber = $('#pageNumber');
  pageNumber = 1;
    $pageNumber.text('Astronaut '+pageNumber+'/4');

  $flagPicture = $('#showFlag');
  $charPortrait = $('.charPortrait');
  $charName = $('.charName');
  $charNationality = $('.charNationality');
  $charAge = $('.charAge');
  $charBackground = $('.charBackground');
  $charQuote = $('.charQuote');

  createCharacterEventListeners();
  resetPage()
}

//##########
//LOAD START SCREEN ON PAGE LOAD
//##########

$('body').empty();
loadStartScreen();

