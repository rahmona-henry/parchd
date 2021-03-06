
var map;
var markers = [];
var firebase = new Firebase("https://parchd.firebaseio.com/")
var place;


function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -41.303, lng: 174.787},
    zoom: 10
    });

  if(document.getElementById("create")){
    var geocoder = new google.maps.Geocoder;
    map.addListener('click', function(e) {
      addMarker({lat: e.latLng.lat(), lng: e.latLng.lng()})
      place = {lat: e.latLng.lat(), lng: e.latLng.lng()}
      geocodeLatLng(geocoder, map)
    })
  }
}
  if(document.getElementById('water')){
      console.log(getMarkers())
      firebase.on('child_added', function(snapshot, prevChildKey){
        var newPosition = snapshot.val();
        var latLng = new google.maps.LatLng(newPosition.lat, newPosition.lng);
        var marker = new google.maps.Marker({
          position: latLng,
          map: map
        })
      })

  }

function addMarker(location){
  if(marker == undefined){
    setMapOnAll()
    var marker = new google.maps.Marker({
      position: location,
      map: map
    })
  }
  markers.push(marker)
  document.getElementById('lat_form').value = location.lat
  document.getElementById('lng_form').value = location.lng
}


function setMapOnAll (map) {
  for (var i = 0 ;i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function getMarkers() {
  var script = document.createElement('a');
    script.href = ('water/marker')
    document.getElementsByTagName('head')[0].appendChild(script)
}
function geocodeLatLng(geocoder, map) {
  var input = "lat: "+ place.lat +", " + "lng: " + place.lng
  console.log(input)
  var latlngStr = input.split(',', 2);
  console.log(latlngStr)
  var latlng = {lat: parseFloat(place.lat), lng: parseFloat(place.lng)};
  geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      console.log("status ok")
      console.log(results[1].address_components[0].long_name)
      document.getElementById('locale').innerHTML = results[1].address_components[0].long_name

    };
  })
}
