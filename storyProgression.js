console.log('story script Loaded');

  var inAtmosphere = true;
  var gameLength = 125;
  var flightMeterFill = 80;

  var $flightMeterInner = $('#flightMeterInner')

$(document).ready(function(){
console.log('Story... check!');

});


//########
//Move sky and ground over time.
//########
var shiftLandscape = setInterval(function() {

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




var adjustFlightMeter = function (){

  if (!isOnTarget)
    {
      flightMeterFill -= 0.5;
      $flightMeterInner.css({
        'width' : flightMeterFill+'vw'
      });
    } else if (isOnTarget)
    {
      flightMeterFill += 0.5;
      $flightMeterInner.css({
        'width' : flightMeterFill+'vw'
      });
    }

    if (flightMeterFill <= 0)
    {
      flightMeterFill = 0;
      console.log('shuttle crashed! You lose!')
      //alert('you lose!');
    } else if (flightMeterFill >=80)
    {
      flightMeterFill = 80;
    }

}
