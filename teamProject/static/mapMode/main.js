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
    "barrackStreet":['/media/hard/bstreet.jpg',{"lat":51.893897,"lng":-8.477632}],
    "GrandParade":['/media/hard/gparade.jpg',{"lat":51.897118,"lng":-8.475033}],
    "PatricksHill":['/media/hard/phill.jpg',{"lat":51.903363,"lng":-8.469804}],
    "Kcs":['/media/hard/Kcs.jpg',{"lat":51.877689,"lng":-8.436458}],
    "BusStation":['/media/hard/bstation.jpg',{"lat":51.899856,"lng":-8.467122}],
    "flyingEnterprise":['/media/hard/flyingEnterprise.jpg',{"lat":51.895295,"lng":-8.476253}],
    "Tanora":['/media/images/hard/Tanora.jpg',{"lat":51.900863, "lng":-8.476560}],
    "CafeAlley":['/media/images/hard/CafeAlley.jpg',{"lat":51.901301, "lng":-8.476131}],
    "Mercy":['/media/images/hard/Mercy.jpg',{"lat":51.900295, "lng":-8.483187}],
    "AlleyBridge":['/media/images/hard/AlleyBridge.jpg',{"lat":51.901079, "lng":-8.476304}],
    "PortAcrossWater":['/media/images/hard/PortAcrossWater.jpg',{"lat":51.902744, "lng":-8.461080}],
    "FirkinCrane":['/media/images/hard/FirkinCrane.jpg',{"lat":51.902744, "lng":-8.475965}],
    "OperaHouseBridge":['/media/images/hard/OperaHouseBridge.jpg',{"lat":51.900629, "lng":-8.470397}],
    "Unity":['/media/images/hard/Unity.jpg',{"lat":51.901397, "lng":-8.463953}],
    "UCC":['/media/images/hard/UCC.jpg',{"lat":51.895333, "lng":-8.489148}],
    "UCC2":['/media/images/hard/UCC2.jpg',{"lat":51.895333, "lng":-8.489148}],
    "Statue":['/media/images/hard/Statue.jpg',{"lat":51.896115, "lng":-8.474586}],
    "Spillys":['/media/images/hard/Spillys.jpg',{"lat":51.897875, "lng":-8.482887}],
    "SkatePark":['/media/images/hard/SkatePark.jpg',{"lat":51.897433, "lng":-8.490382}],
    "SinE":['/media/images/hard/SinE.jpg',{"lat":51.901814, "lng":-8.471023}],
    "Sicillian":['/media/images/hard/Sicillian.jpg',{"lat":51.890177, "lng":-8.493368}],
    "Shandon":['/media/images/hard/Shandon.jpg',{"lat":51.903251, "lng":-8.477732}],
    "Shandon Street":['/media/images/hard/ShandonStreet.jpg',{"lat":51.901623, "lng":-8.479642}],
    "Shakey Bridge":['/media/images/hard/ShakeyBridge.jpg',{"lat":51.898066, "lng":-8.490864}],
    "Scoozi":['/media/images/hard/Scoozis.jpg',{"lat":51.898594, "lng":-8.469922}],
    "St Mary Church":['/media/images/hard/StMaryChurch.jpg',{"lat":51.901179, "lng":-8.474818}],
    "Rob Roy":['/media/images/hard/RobRoy.jpg',{"lat":51.897674, "lng":-8.471823}],
    "R&H Hall":['/media/images/hard/RHHall.jpg',{"lat":51.898583, "lng":-8.459953}],
    "Alchemy":['/media/images/hard/Alchemy.jpg',{"lat":51.893977, "lng":-8.477519}],
    "Police gaff":['/media/images/hard/PoliceGaff.jpg',{"lat":51.895395, "lng":-8.465258}],
    "Piss alley":['/media/images/hard/PissAlley.jpg',{"lat":51.899129, "lng":-8.475263}],
    "Paddy the farmer":['/media/images/hard/PaddyTheFarmers.jpg',{"lat":51.892866, "lng":-8.465993}],
    "O'Sho":['/media/images/hard/Osho.jpg',{"lat":51.894760, "lng":-8.476443}],
    "Bowling":['/media/images/hard/Bowling.jpg',{"lat":51.900563, "lng":-8.465549}],
    "Opera House":['/media/images/hard/OperaHouse.jpg',{"lat":51.900384, "lng":-8.472303}],
    "Opera Lane":['/media/images/hard/OperaLane.jpg',{"lat":51.899517, "lng":-8.472913}],
    "North Main":['/media/images/hard/NorthMain.jpg',{"lat":51.899690, "lng":-8.478374}],
    "Mercy":['/media/images/hard/Mercy.jpg',{"lat":51.900165, "lng":-8.483202}],
    "Novacento":['/media/images/hard/Novacento.jpg',{"lat":51.901625, "lng":-8.469411}],
    "Centra Mary":['/media/images/hard/MarybyCentra.jpg',{"lat":51.891242, "lng":-8.488524}],
    "Lough Bar":['/media/images/hard/LoughBar.jpg',{"lat":51.886096, "lng":-8.488978}],
    "Jewton":['/media/images/hard/Jewtown.jpg',{"lat":51.896746, "lng":-8.459739}],
    "Jewtown Roundabout":['/media/images/hard/JewtownRoundabout.jpg',{"lat":51.897014, "lng":-8.458851}],
    "Jewtown park":['/media/images/hard/JewtownPark.jpg',{"lat":51.895929, "lng":-8.461030}],
    "Parnell":['/media/images/hard/Parnell.jpg',{"lat":51.899681, "lng":-8.466032}],
    "Hidden Mary":['/media/images/hard/HiddenMary.jpg',{"lat":51.894759, "lng":-8.471552}],
    "Gables":['/media/images/hard/Gables.jpg',{"lat":51.893475, "lng":-8.470255}],
    "Fountain":['/media/images/hard/Fountain.jpg',{"lat":51.896920, "lng":-8.474892}],
    "Forde's Bridge":['/media/images/hard/Fordes.jpg',{"lat":51.895583, "lng":-8.476222}],
    "Elizabeth Fort":['/media/images/hard/Elizabeth Fort.jpg',{"lat":51.894395, "lng":-8.477546}],
    "Echo Boy":['/media/images/hard/EchoBoy.jpg',{"lat":51.898509, "lng":-8.472210}],
    "Crane":['/media/images/hard/Crane.jpg',{"lat":51.897791, "lng":-8.469512}],
    "Comm":['/media/images/hard/CollegeComm.jpg',{"lat":51.895202, "lng":-8.468380}],
    "City Hall":['/media/images/hard/CityHall.jpg',{"lat":51.897645, "lng":-8.465054}],
    "Canty & Son":['/media/images/hard/CantyAndSon.jpg',{"lat":51.895381, "lng":-8.465322}],
    "Cafe Spresso":['/media/images/hard/CafeSpresso.jpg',{"lat":51.901573, "lng":-8.469345}],
    "ByUnityHouse":['/media/images/hard/ByUnityHouse.jpg',{"lat":51.901380, "lng":-8.467427}],
    "By Sin É":['/media/images/hard/BySinE.jpg',{"lat":51.901865, "lng":-8.471284}],
    "By NCT":['/media/images/hard/ByLicenceGaff.jpg',{"lat":51.895318, "lng":-8.466569}],
    "By Leisureplex":['/media/images/hard/ByLeisureplex.jpg',{"lat":51.901314, "lng":-8.465548}],
    "By Franwell":['/media/images/hard/ByFranwell.jpg',{"lat":51.900552, "lng":-8.483401}],
    "By Comm":['/media/images/hard/ByCollegeComm.jpg',{"lat":51.895033, "lng":-8.469014}],
    "Centra Mary":['/media/images/hard/ByCentraMary.jpg',{"lat":51.891244, "lng":-8.488542}],
    "Before Alchemy":['/media/images/hard/BeforeAlchemy.jpg',{"lat":51.893704, "lng":-8.477830}],
    "Barrack's Junction":['/media/images/hard/BarracksJunction.jpg',{"lat":51.892688, "lng":-8.480826}],
    "Hurler":['/media/images/hard/Hurler.jpg',{"lat":51.894080, "lng":-8.464954}],
    "Blackrock2":['/media/images/hard/Blackrock2.jpg',{"lat":51.889837, "lng":-8.494348}],
    "Blackrock5":['/media/images/hard/Blackrock5.jpg',{"lat":51.898269, "lng":-8.416264}],
    "Blackrock6":['/media/images/hard/Blackrock6.jpg',{"lat":51.897054, "lng":-8.416595}],
    "Blackrock7":['/media/images/hard/Blackrock7.jpg',{"lat":51.898346, "lng":-8.416944}],
    "Blackrock Snow":['/media/images/hard/BlackrockSnow.jpg',{"lat":51.895380, "lng":-8.418584}],
    "Bish1":['/media/images/hard/Bish1.jpg',{"lat":51.888784, "lng":-8.526953}],
    "Bish2":['/media/images/hard/Bish2.jpg',{"lat":51.887035, "lng":-8.527096}],
    "Bish3":['/media/images/hard/Bish3.jpg',{"lat":51.886112, "lng":-8.529311}],
    "Bish4":['/media/images/hard/Bish4.jpg',{"lat":51.885827, "lng":-8.531442}],
    "Bish5":['/media/images/hard/Bish5.jpg',{"lat":51.885127, "lng":-8.530692}],
    "Bish6":['/media/images/hard/Bish6.jpg',{"lat":51.888976, "lng":-8.532927}],
    "Bish7":['/media/images/hard/Bish7.jpg',{"lat":51.888654, "lng":-8.538077}],
    "Bridge":['/media/images/hard/Bridge.jpg',{"lat":51.873849, "lng":-8.430468}],
    "Church flowers":['/media/images/hard/ChurchFlowers.jpg',{"lat":51.894172, "lng": -8.472918}],
    "Douglas church":['/media/images/hard/DouglasChurch.jpg',{"lat":51.873849, "lng":-8.434870}],
    "Douglas Rd 1":['/media/images/hard/DouglasRd1.jpg',{"lat":51.879555, "lng":-8.445523}],
    "Finline":['/media/images/hard/Finline.jpg',{"lat":51.876558, "lng":-8.440912}],
    "Grange road":['/media/images/hard/GrangeRoad.jpg',{"lat":51.873470, "lng":-8.439670}],
    "Mayfield":['/media/images/hard/Mayfield.jpg',{"lat":1.911523, "lng":-8.438112}],   
    "Maryborough":['/media/images/hard/Maryborough.jpg',{"lat":51.875579, "lng":-8.430468}],
    "Douglas park":['/media/images/hard/DouglasPark.jpg',{"lat":51.874381, "lng":-8.438106}],
    "Kubo":['/media/images/hard/Kubo.jpg',{"lat":51.873839, "lng":-8.438734}],
    "Back douglas road":['/media/images/hard/BackDouglasRoad.jpg',{"lat":51.874874, "lng":-8.439780}],
    "Link":['/media/images/hard/Link.jpg',{"lat":51.877214, "lng":-8.441760}],
    "Nemo":['/media/images/hard/Nemo.jpg',{"lat":51.880268, "lng":-8.448186}],
    "An Post":['/media/images/hard/AnPost.jpg',{"lat":51.884180, "lng":-8.458971}],
    "Tavern":['/media/images/hard/Tavern.jpg',{"lat":51.886385, "lng":-8.464636}],
    "Douglas Rd church":['/media/images/hard/DouglasRdChurch.jpg',{"lat":51.887366, "lng":-8.466252}],
    "Gals school":['/media/images/hard/GalsSchool.jpg',{"lat":51.888715, "lng":-8.468385}],
    "Jerry Hurley":['/media/images/hard/JerryHurley.jpg',{"lat":51.891830, "lng":-8.471812}],
    "Town church":['/media/images/hard/TownChurch.jpg',{"lat":51.894051, "lng":-8.474981}],
    "Town alley":['/media/images/hard/TownAlley.jpg',{"lat":51.894084, "lng":-8.474383}],
    "CollinsBarracks":['/media/hard/CollinsBarracks.jpg',{"lat":51.906835,"lng":-8.462115}],
};
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
