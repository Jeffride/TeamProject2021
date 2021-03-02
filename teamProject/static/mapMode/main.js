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
      score=latestScore+=150;
    }
    else{
      score=latestScore+=100;
    }
    
  }
  if(distance.toFixed(2)>.5){

    if(distance.toFixed(2)<=1){
      score=latestScore+=80
    }
    else{
      score=latestScore += Math.floor(80/distance.toFixed(2));
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
    alert("Game Over");
  }
    
  

}
var dict = {
  "barrackStreet":['/static/images/hard/bstreet.jpg',{"lat":51.893897,"lng":-8.477632}],
  "GrandParade":['/static/images/hard/gparade.jpg',{"lat":51.897118,"lng":-8.475033}],
  "PatricksHill":['/static/images/hard/phill.jpg',{"lat":51.903363,"lng":-8.469804}],
  "Kcs":['/static/images/hard/Kcs.jpg',{"lat":51.877689,"lng":-8.436458}],
  "BusStation":['/static/images/hard/bstation.jpg',{"lat":51.899856,"lng":-8.467122}],
  "flyingEnterprise":['/static/images/hard/flyingEnterprise.jpg',{"lat":51.895295,"lng":-8.476253}],
  "tomBarrys":['/static/images/hard/tomBarrys.jpg',{"lat":51.893586,"lng":-8.478064}],
  "CollinsBarracks":['/static/images/hard/CollinsBarracks.jpg',{"lat":51.906835,"lng":-8.462115}],
};
const places = Object.keys(dict);

//PAGE LOADING INSTRUCTIONS
window.onload = function(){ 
  var info = document.getElementById("popup");
  var btn = document.getElementById("contin");
  const img = document.getElementById("place");

  const placeList = shufflePlaces(places);

  img.src = dict[placeList[currentIndex]][0];

  window.onclick = function(event) {
    if(event.target == popup){
      info.style.display = "none";
    }
  }
  btn.onclick = function(event) {
    info.style.display = "none";
  }

}