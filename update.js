$(document).ready(function(){
  console.log('Update function... loaded!')
});

  var update = function(){

  trackCoordinates(); //flightControls.js
  moveTargetZone(); //flightControls.js
  controlShuttle(); //flightControls.js
  onTarget(); //flightControls.js
  rotationEquilibrium(); //flightControls.js
  clampRoll(); //flightControls.js
  clampPitch(); //flightControls.js
  cockpitRumble(); //flightControls.js making me sick
  adjustFlightMeter(); //storyProgression.js


  }

  setInterval(update, 50);

