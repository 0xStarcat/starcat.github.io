// var createAstronaut = function {
// 	name: "",
// 	nationality: "",
// 	age: -1,
// 	background: "",
// 	quote: "",
// 	status: "alive"
// }


var flagPicturesIndex = flagPictures.length;
var nameIndex = 0;
var nationalityIndex = flagPicturesIndex;
var charAge = 35;
var backgroundIndex = 0;
var characterPictures = [
'images/astronaut1.png',
'images/astronaut2.png',
'images/astronaut3.png',
'images/astronaut4.png',
'images/astronaut5.png',
'images/astronaut6.png',
'images/astronaut7.png',
'images/astronaut8.jpeg',
'images/space-suit-309023_640.png'
];
var pictureIndex = 0;

var quoteIndex = 0;



var newAstronaut = undefined;
var astronaut1 = undefined;
var astronaut2 = undefined;
var astronaut3 = undefined;
var astronaut4 = undefined;
var astronautIndex = 0;






$('document').ready(function(){

  console.log('CharacterCreation script... standing by!')


});



function createCharacterEventListeners(){



  $('#changeP_left').on('click', function(e){
    console.log('Left portrait Arrow clicked!');
      pictureIndex--
      if (pictureIndex < 0)
      {
        pictureIndex = characterPictures.length -1;
      }
      $charPortrait.attr('src',characterPictures[pictureIndex])
  });

  $('#changeP_right').on('click', function(e){
    console.log('Right portrait Arrow clicked!');
     pictureIndex++
      if (pictureIndex > characterPictures.length -1)
      {
        pictureIndex = 0;
      }
      $charPortrait.attr('src',characterPictures[pictureIndex])
  });

  $charName.on('keydown', function(){
    //console.log($charName.val());
  })

  $leftArrows.on('click', function(e){

    if (e.target === $leftArrows[1])
    {
      console.log('Change Nationality Left');

      flagPicturesIndex--;
      if (flagPicturesIndex < 0)
      {
        flagPicturesIndex=(flagPictures.length-1);
      }

      $flagPicture.attr('src', 'images/flags64/'+flagPictures[flagPicturesIndex]);
      var nation = flagPictures[flagPicturesIndex];
      nation = nation.replace(/flag/, '').replace(/-/g, ' ').replace('.png', '');
      $charNationality.val(nation);
    }
    if (e.target === $leftArrows[2])
    {

      console.log('Change Age Left');

      charAge--;

      if (charAge <= 25)
      {
        charAge = 25;
      }

      $charAge.val(charAge);
    }
    if (e.target === $leftArrows[3])
    {
      console.log('Change Background Left');
      backgroundIndex--
      if (backgroundIndex < 0)
      {
        backgroundIndex = characterbackgrounds.length -1;
      }
      $charBackground.val(characterbackgrounds[backgroundIndex]);
    }
    if (e.target === $leftArrows[4])
    {
      console.log('Change Quote Left');
       quoteIndex--
      if (quoteIndex < 0)
      {
        quoteIndex = characterQuotes.length -1;
      }
      $charQuote.val(characterQuotes[quoteIndex]);
    }
  });

  $rightArrows.on('click', function(e){

    if (e.target === $rightArrows[1])
    {
      console.log('Change Nationality Right');
      flagPicturesIndex++;
      if (flagPicturesIndex >= flagPictures.length)
      {
        flagPicturesIndex = 0;
      }

      $flagPicture.attr('src', 'images/flags64/'+flagPictures[flagPicturesIndex]);
      var nation = flagPictures[flagPicturesIndex];
      nation = nation.replace(/flag/, '').replace(/-/g, ' ').replace('.png', '');
      $charNationality.val(nation);

    }
    if (e.target === $rightArrows[2])
    {
      console.log('Change Age Right');

      charAge++;
       if (charAge >= 77)
      {
        charAge = 77;
      }
      $charAge.val(charAge);
    }
    if (e.target === $rightArrows[3])
    {
      console.log('Change Background Right');

      backgroundIndex++
      if (backgroundIndex >= characterbackgrounds.length)
      {
        backgroundIndex = 0;
      }
      $charBackground.val(characterbackgrounds[backgroundIndex]);
    }
    if (e.target === $rightArrows[4])
    {
      console.log('Change Quote Right');

       quoteIndex++
    if (quoteIndex >= characterQuotes.length)
      {
        quoteIndex = 0;
      }
      $charQuote.val(characterQuotes[quoteIndex]);
    }

  });

  $charName.on('click', function(){
    $charName.val('');
  })
  $charAge.on('click', function(){
    $charAge.val('');
  })

  $charAge.on('keyup', function(){
    var inputAge = $charAge.val().replace(/\D/g,'');
    if (inputAge.length > 1)
    {
      charAge = inputAge;
      $charAge.val(charAge);
      if (inputAge < 25)
      {
        charAge = 25;
        $charAge.val(charAge);

      } else if (inputAge > 77){

        charAge = 77;
        $charAge.val(charAge);
      }
    }
  })

  $charNationality.on('click', function(){
    $charNationality.val('');
  })

  $charNationality.on('keyup', function(){
    var searchNation = $charNationality.val().toUpperCase();
    var inputLength = searchNation.length;

    for (var i = 0; i < flagPictures.length; i++)
    {
        console.log (searchNation +" compared with " + flagPictures[i].substr(0, (inputLength)));

      if (searchNation === flagPictures[i].substr(0, 1))
      {
        $flagPicture.css('background', 'url(images/flags64/'+flagPictures[i])+'))';
        var nation = flagPictures[i];
        flagPicturesIndex = i;
        nation = nation.replace(/flag/, '').replace(/-/g, ' ').replace('.png', '');
        $charNationality.val(nation);
        break
      }
    }

  })
  $charBackground.on('click', function(){
    $charBackground.val('');
  })

  $charQuote.on('click', function(){
    $charQuote.val('');
  })

   $charQuote.on('keydown', function(){
    //console.log($charQuote.val());
  })


   $(window).on('mouseup', function(){

      if ($charName.val() === '')
      {
        $charName.val('Name');
      }
      if ($charAge.val() === '')
      {
        $charAge.val('< Age >');
      }

      if ($charNationality.val() === '')
      {
        $charNationality.val('< Nationality >');
      }

      if ($charBackground.val() === '')
      {
        $charBackground.val('< Background >');
      }

      if ($charQuote.val() === '')
      {
        $charQuote.val('< Quote >');
      }


   });

  $submitButton.on('click', function(){
    console.log('submit button clicked!')

    newAstronaut = new NewCharacter($charName.val(), $charNationality.val(), $charAge.val(), $charBackground.val(), $charQuote.val(), "")

    switch (pageNumber)
    {
      case 1:
      astronaut1 = newAstronaut;
      pageNumber++;
      $pageNumber.text('Astronaut '+pageNumber+'/4');
      $('#outerWrapper').animate({opacity: 0},250)
      .animate({opacity: 1}, 500)
      console.log(astronaut1);
      resetPage();
      break;

      case 2:
      astronaut2 = newAstronaut;
      pageNumber++;
      $pageNumber.text('Astronaut '+pageNumber+'/4');
      $('#outerWrapper').animate({opacity: 0},250)
      .animate({opacity: 1}, 500)
      console.log(astronaut2);
      resetPage();
      break;

      case 3:
      astronaut3 = newAstronaut;
      pageNumber++;
      $pageNumber.text('Astronaut '+pageNumber+'/4');
      $('#outerWrapper').animate({opacity: 0},250)
      .animate({opacity: 1}, 500)
      console.log(astronaut3);
      resetPage();
      break;

      case 4:
      astronaut4 = newAstronaut;
      console.log(astronaut4);
      console.log('start main game!');
      resetPage();
      $('body').animate({opacity: 0},2000,function(){
        $('body').empty();
        loadMainGame();
        startMainGame(500, 30000, 15000);
        setTimeout(function(){
          $('body').animate({
            opacity: 1
          }, 2000)
        })
      });

      break;
    }


  });

}

function resetPage(){

  flagPicturesIndex = 0;
  $flagPicture.attr('src', 'images/globe.png');
  $charPortrait.attr('src' , 'images/astronaut1.png');
  pictureIndex = 0;
  $charName.text('Name');
  nationalityIndex = 0;
  $charNationality.val(' < Nationality > ');
  charAge = 35;
  $charAge.val(' < Age >');
  backgroundIndex = 0;
  $charBackground.val('< Background > ');
  randomQuote();

}

function randomQuote() {

  var randomQuote = Math.floor(Math.random() * characterQuotes.length);
  pictureIndex = Math.floor(Math.random() * characterPictures.length);
  $charQuote.val(characterQuotes[randomQuote]);
  $charPortrait.attr('src',characterPictures[pictureIndex])

}

function NewCharacter(name, nationality, age, background, quote, picture) {

  this.name = name,
  this.nationality = nationality,
  this.age = age,
  this.background = background,
  this.quote = quote,
  this.picture = characterPictures[pictureIndex],
  this.status = 'alive'

}

