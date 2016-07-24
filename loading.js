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



var $leftArrows = undefined;
var $rightArrows = undefined;
var $submitButton = undefined;
var $pageNumber = undefined;
var pageNumber = undefined;
var $targetLeft = undefined;
var $targetUp = undefined;
var $targetDown = undefined;
var $targetRight = undefined;

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
  $portraits = $('<div class="portraitContainer id="portrait0""><img class="portrait" src="http://icons.iconarchive.com/icons/iconshock/real-vista-jobs/256/astronaut-icon.png"></div><div class="portraitContainer"id="portrait1"><img class="portrait" src="http://icons.iconarchive.com/icons/iconshock/real-vista-jobs/256/astronaut-icon.png"></div><div class="portraitContainer" id="portrait2"><img class="portrait" src="http://icons.iconarchive.com/icons/iconshock/real-vista-jobs/256/astronaut-icon.png"></div><div class="portraitContainer" id="portrait3"><img class="portrait" src="http://icons.iconarchive.com/icons/iconshock/real-vista-jobs/256/astronaut-icon.png"></div>');
    $portraitZone.append($portraits);
    $portraits.hide();

  //Rhythm-game elements
  $targetLeft = $('#phLeft');
  $targetUp = $('#phUp');
  $targetDown = $('#phDown');
  $targetRight = $('#phRight');
  $arrowSpawner = $('#arrowSpawner');
  $rhythmZone = $('#rhythmZone');
  rhythmZoneTop = $rhythmZone.position().top;
  rhythmZoneBottom = $rhythmZone.position().top + $rhythmZone.innerHeight();
  createRhythmZone = $('<div class ="spawnBox rhythm" id="pLeft"><div class="arrow arrowBackground rhythm" id="phLeft"></div><div class="arrow rhythm" id="Left"></div></div><div class ="spawnBox rhythm" id="pUp"><div class="arrow arrowBackground rhythm" id="phUp"></div><div class="arrow rhythm" id="Up"></div></div><div class ="spawnBox rhythm" id="pDown"><div class="arrow arrowBackground rhythm" id="phDown"></div><div class="arrow rhythm" id="Down"></div></div><div class ="spawnBox rhythm" id="pRight"><div class="arrow arrowBackground rhythm" id="phRight"></div><div class="arrow rhythm" id="Right"></div></div>');
    $($rhythmZone).append(createRhythmZone);
    addRhythmListeners();
    $rhythmZone.hide();


  setFlightEventListeners();
  loadPenaltyData();
  startUpdate();



}

// loadMainGame();
// startMainGame(500, 30000, 15000);

function loadCharacterCreation(){

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

loadCharacterCreation();
