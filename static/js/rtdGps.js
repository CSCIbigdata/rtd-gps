var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

// a simple wrapper function around computeDistance that takes a tolerance. EVERYTHING IN METERS
function calcDistance(loc1,loc2,tolerance) {
  var distance = google.maps.geometry.spherical.computeDistanceBetween(loc1, loc2);
  
  if (distance <= tolerance)
    return "TIME TO WAKE UP"
  else
    return "Everything ok"
}

//this is where we make the actual map
function generateMap(){
  //calculate our current position and run some other stuff. We might need to loop this every 10 seconds.
  function success(pos) {
    var crd = pos.coords;
    var current = new google.maps.LatLng(crd.latitude,crd.longitude);

    //our destinations, a dictionary of the stops
    var destinations = {
                       'boulder_transit_center' : new google.maps.LatLng(40.017103,-105.276444),
                       'broadway_16th' : new google.maps.LatLng(40.005663,-105.272381),
                       'broadway_27th' : new google.maps.LatLng(39.996074,-105.261018)
                       }

    //we select the stop we want to go to.
    var destination = destinations['broadway_27th'];

    //the map options for google maps
    var mapOptions = {
      center: current,
      zoom: 14
    }

    console.log(calcDistance(current,destination,50))

    console.log(mapOptions)
    console.log('Your current position is:');
    console.log('Latitude : ' + crd.latitude);
    console.log('Longitude: ' + crd.longitude);
    console.log('More or less ' + crd.accuracy + ' meters.');

    //instantiate the google map object
    var map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);

    //some markers on the map
    var destination_marker = new google.maps.Marker({
      position: destination,
      map: map,
      title: "Where I am going!"
    });

    var current_marker = new google.maps.Marker({
      position: current,
      map: map,
      title:"Hello World!"
    });
  };

  function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  };

  //this actually gets our location
  navigator.geolocation.getCurrentPosition(success, error, options);
}

//this embedds the object in the page
google.maps.event.addDomListener(window, 'load', generateMap());