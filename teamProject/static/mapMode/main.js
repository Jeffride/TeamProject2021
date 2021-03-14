let map;
let markers = [];
let coords = [];

let currentIndex = 0;
let disableClicks = false;
let score =0;
let latestScore = 0;

function haversine_distance(mk1, mk2) {
  var R = 6371.0710; // Radius of the Earth in miles
  var rlat1 = mk1.position.lat() * (Math.PI/180); // Convert degrees to radians
  var rlat2 = mk2.position.lat() * (Math.PI/180); // Convert degrees to radians
  var difflat = rlat2-rlat1; // Radian difference (latitudes)
  var difflon = (mk2.position.lng()-mk1.position.lng()) * (Math.PI/180); // Radian difference (longitudes)

  var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
  return d;
}

function initMap() {
  const myLatlng = { lat: 51.8985, lng: -8.4756 };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    draggableCursor: 'crosshair',
    center: myLatlng,
  });
  
  // This event listener will call addMarker() when the map is clicked.
  map.addListener("click", (event) => {
    if(!disableClicks){
      if(markers.length>0){
        deleteMarkers();
      }
      addMarker(event.latLng);
      confirmAnswer();
    }
  });
  
}

// Adds a marker to the map and push to the array.
function addMarker(location) {
  const marker = new google.maps.Marker({
    position: location,
    map: map,
  });
  markers.push(marker);
  coords.push(location);
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
  coords = [];
}

function confirmAnswer(){
  var accept = document.getElementById("confirm");
  var bttn = document.getElementById("No");
  var bttn1 = document.getElementById("Yes");
  accept.style.display = "block";

  bttn.onclick = function(event) {
    accept.style.display = "none";
  }
  bttn1.onclick = function(event) {
    disableClicks = true;
    accept.style.display = "none";
    calculateDistance();
  }
}

function calculateDistance(){
  const answer = dict[places[currentIndex]][1];
  addMarker(answer);
  coords.push(answer);
  
  linepath = new google.maps.Polyline(
    {
      path: coords,
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2,
    }
  );
  linepath.setMap(map);
  //addLine(linepath);
  var distance = haversine_distance(markers[0],markers[1]);
  console.log("Distance between markers: " + distance.toFixed(2) + " mi.");
  
  if(distance.toFixed(2)<=.5){
    if(distance.toFixed(2)<=.1){
      score+=150;
      latestScore+=150;
    }
    else{
      score += 100;
      latestScore+=100;
    }
    
  }
  if(distance.toFixed(2)>.5){

    if(distance.toFixed(2)<=1){
      score += 80;
      latestScore+=80;
    }
    else{
      score+= Math.floor(80/distance.toFixed(2));
      latestScore += Math.floor(80/distance.toFixed(2));
    }
  }
  document.getElementById('distancefrom').innerHTML = "You clicked: " + distance.toFixed(2) + " km away from the actual location"+"<br/>"+"Points earned: "+latestScore;
  latestScore = 0;
  
  document.getElementById('result').style.display = "block";


}
function addLine(line){
  line.setMap(map);
}
function removeLine(){
  linepath.setMap(null);
}
function shufflePlaces(places){
  for (var i = places.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * i);
    var temp = places[i];
    places[i] = places[j];
    places[j] = temp;
}
return places;
}
function updateScore(){
  document.getElementById("scr").innerHTML = "Score: "+score;
}
function nextImage(){
  updateScore();
  disableClicks = false;
  console.log("btu");
  if(currentIndex<places.length-1){
    currentIndex+=1;
    const img = document.getElementById("place");
    const result = document.getElementById("result");
    img.src = dict[places[currentIndex]][0];
    result.style.display = "none";
    deleteMarkers();
    removeLine();
    initMap();
  }
  else{
    gameOver();
  }
}
function gameOver(){
  document.getElementById("scoreform").style.display = "block";
  document.getElementById("id_high_score").value = score;
}


var dict = {
	"Tanora":['static/images/hard/Tanora.jpg',{"lat":51.900863, "lng":-8.476560}],
	"Cafe Alley":['static/images/hard/Cafe Alley.jpg',{"lat":51.901301, "lng":-8.476131}],
	"Mercy":['static/images/hard/Mercy.jpg',{"lat":51.900295, "lng":-8.483187}],
	"Alley Bridge":['static/images/hard/Alley Bridge.jpg',{"lat":51.901079, "lng":-8.476304}],
	"Port Across Water":['static/images/hard/Port across water.jpg',{"lat":51.902744, "lng":-8.461080}],
	"Firkin Crane":['static/images/hard/Firkin Crane.jpg',{"lat":51.902744, "lng":-8.475965}],
	"Opera House Bridge":['static/images/hard/Opera House bridge.jpg',{"lat":51.900629, "lng":-8.470397}],
	"Unity":['static/images/hard/Unity.jpg',{"lat":51.901397, "lng":-8.463953}],
	"UCC":['static/images/hard/UCC.jpg',{"lat":51.895333, "lng":-8.489148}],
	"UCC2":['static/images/hard/UCC2.jpg',{"lat":51.895333, "lng":-8.489148}],
	"Statue":['static/images/hard/Statue.jpg',{"lat":51.896115, "lng":-8.474586}],
	"Spilly's":['static/images/hard/Spillys.jpg',{"lat":51.897875, "lng":-8.482887}],
	"Skate Park":['static/images/hard/Skate Park.jpg',{"lat":51.897433, "lng":-8.490382}],
	"Sin É":['static/images/hard/Sin E.jpg',{"lat":51.901814, "lng":-8.471023}],
	"Sicillian":['static/images/hard/Sicillian.jpg',{"lat":51.890177, "lng":-8.493368}],
	"Shandon":['static/images/hard/Shandon.jpg',{"lat":51.903251, "lng":-8.477732}],
	"Shandon Street":['static/images/hard/Shandon Street.jpg',{"lat":51.901623, "lng":-8.479642}],
	"Shakey Bridge":['static/images/hard/Shakey Bridge.jpg',{"lat":51.898066, "lng":-8.490864}],
	"Scoozi":['static/images/hard/Scoozis.jpg',{"lat":51.898594, "lng":-8.469922}],
	"St Mary Church":['static/images/hard/St Mary.jpg',{"lat":51.901179, "lng":-8.474818}],
	"Rob Roy":['static/images/hard/Rob Roy.jpg',{"lat":51.897674, "lng":-8.471823}],
	"R&H Hall":['static/images/hard/R&H Hall.jpg',{"lat":51.898583, "lng":-8.459953}],
	"Alchemy":['static/images/hard/Alchemy.jpg',{"lat":51.893977, "lng":-8.477519}],
	"Police gaff":['static/images/hard/police gaff.jpg',{"lat":51.895395, "lng":-8.465258}],
	"Piss alley":['static/images/hard/Piss alley.jpg',{"lat":51.899129, "lng":-8.475263}],
	"Paddy the farmer":['static/images/hard/Paddy the Farmers.jpg',{"lat":51.892866, "lng":-8.465993}],
	"O'Sho":['static/images/hard/Osho.jpg',{"lat":51.894760, "lng":-8.476443}],
	"Opera Lane":['static/images/hard/Opera Lane.jpg',{"lat":51.899517, "lng":-8.472913}],
	"Bowling":['static/images/hard/Bowling.jpg',{"lat":51.900563, "lng":-8.465549}]
	"Opera House":['static/images/hard/Opera House.jpg',{"lat":51.900384, "lng":-8.472303}]
	"Opera Lane":['static/images/hard/Opera Lane.jpg',{"lat":51.899517, "lng":-8.472913}],
	"North Main":['static/images/hard/North Main.jpg',{"lat":51.899690, "lng":-8.478374}],
	"Mercy":['static/images/hard/Mercy.jpg',{"lat":51.900165, "lng":-8.483202}],
	"Novacento":['static/images/hard/Novacento.jpg',{"lat":51.901625, "lng":-8.469411}],
	"Centra Mary":['static/images/hard/Mary by Centra.jpg',{"lat":51.891242, "lng":-8.488524}],
	"Lough Bar":['static/images/hard/Lough bar.jpg',{"lat":51.886096, "lng":-8.488978}],
	"Jewton":['static/images/hard/jewtown.jpg',{"lat":51.896746, "lng":-8.459739}],
	"Jewtown Roundabout":['static/images/hard/Jewtown roundabout.jpg',{"lat":51.897014, "lng":-8.458851}],
	"Jewtown park":['static/images/hard/jewtown park.jpg',{"lat":51.895929, "lng":-8.461030}],
	"Parnell":['static/images/hard/Parnell.jpg',{"lat":51.899681, "lng":-8.466032}],
	"Hidden Mary":['static/images/hard/hidden mary.jpg',{"lat":51.894759, "lng":-8.471552}],
	"Gables":['static/images/hard/gables.jpg',{"lat":51.893475, "lng":-8.470255}],
	"Fountain":['static/images/hard/Fountain.jpg',{"lat":51.896920, "lng":-8.474892}],
	"Forde's Bridge":['static/images/hard/Fordes.jpg',{"lat":51.895583, "lng":-8.476222}],
	"Elizabeth Fort":['static/images/hard/Elizabeth Fort.jpg',{"lat":51.894395, "lng":-8.477546}],
	"Echo Boy":['static/images/hard/Echo boy.jpg',{"lat":51.898509, "lng":-8.472210}],
	"Crane":['static/images/hard/.jpg',{"lat":51.897791, "lng":-8.469512}],
	"Comm":['static/images/hard/college comm.jpg',{"lat":51.895202, "lng":-8.468380}],
	"City Hall":['static/images/hard/City Hall.jpg',{"lat":51.897645, "lng":-8.465054}],
	"Canty & Son":['static/images/hard/Canty and son.jpg',{"lat":51.895381, "lng":-8.465322}],
	"Cafe Spresso":['static/images/hard/Cafe spresso.jpg',{"lat":51.901573, "lng":-8.469345}],
	"Unity Alley":['static/images/hard/by unity house.jpg',{"lat":51.901380, "lng":-8.467427}],
	"By Sin É":['static/images/hard/By Sin E.jpg',{"lat":51.901865, "lng":-8.471284}],
	"By NCT":['static/images/hard/by licence gaff.jpg',{"lat":51.895318, "lng":-8.466569}],
	"By Leisureplex":['static/images/hard/by leisureplex.jpg',{"lat":51.901314, "lng":-8.465548}],
	"By Franwell":['static/images/hard/By franwell.jpg',{"lat":51.900552, "lng":-8.483401}],
	"By Comm":['static/images/hard/By College Comm.jpg',{"lat":51.895033, "lng":-8.469014}],
	"Centra Mary":['static/images/hard/By Centra Mary.jpg',{"lat":51.891244, "lng":-8.488542}],
	"Before Alchemy":['static/images/hard/Before Alchemy.jpg',{"lat":51.893704, "lng":-8.477830}],
	"Barrack's Junction":['static/images/hard/Barracks junction.jpg',{"lat":51.892688, "lng":-8.480826}],
	"Hurler":['static/images/hard/Hurler.jpg',{"lat":51.894080, "lng":-8.464954}],
	"Blackrock2":['static/images/hard/Blackrock2.jpg',{"lat":51.889837, "lng":-8.494348}],
	"Blackrock5":['static/images/hard/Blackrock5.jpg',{"lat":51.898269, "lng":-8.416264}],
	"Blackrock6":['static/images/hard/Blackrock6.jpg',{"lat":51.897054, "lng":-8.416595}],
	"Blackrock7":['static/images/hard/Blackrock7.jpg',{"lat":51.898346, "lng":-8.416944}],
	"Blackrock Snow":['static/images/hard/Blackrock snow.jpg',{"lat":51.895380, "lng":-8.418584}],
	"Bish1":['static/images/hard/Bish 1.jpg',{"lat":51.888784, "lng":-8.526953}],
	"Bish2":['static/images/hard/Bish2.jpg',{"lat":51.887035, "lng":-8.527096}],
	"Bish3":['static/images/hard/Bish3.jpg',{"lat":51.886112, "lng":-8.529311}],
	"Bish4":['static/images/hard/Bish4.jpg',{"lat":51.885827, "lng":-8.531442}],
	"Bish5":['static/images/hard/Bish5.jpg',{"lat":51.885127, "lng":-8.530692}],
	"Bish6":['static/images/hard/Bish6.jpg',{"lat":51.888976, "lng":-8.532927}],
	"Bish7":['static/images/hard/Bish7.jpg',{"lat":51.888654, "lng":-8.538077}],
	

}



const places = Object.keys(dict);

//PAGE LOADING INSTRUCTIONS
window.onload = function(){ 
  var info = document.getElementById("popup");
  var btn = document.getElementById("contin");
  const img = document.getElementById("place");

  const placeList = shufflePlaces(places);

  img.src = dict[placeList[currentIndex]][0];
  
  var form = document.getElementById("scoreform");
  form.elements[1].readOnly = true;
  //form.style.display = "none";
  window.onclick = function(event) {
    if(event.target == popup){
      info.style.display = "none";
    }
  }
  btn.onclick = function(event) {
    info.style.display = "none";
  }

}