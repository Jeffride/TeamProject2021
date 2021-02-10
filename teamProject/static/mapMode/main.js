
let map;
let poly;

var coords = [];
var markers = [];


function initMap() {
  const myLatlng = { lat: 51.8985, lng: -8.4756 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    draggableCursor: 'crosshair',
    center: myLatlng,
  });
  let infoWindow = new google.maps.InfoWindow({
    content: "Click where you think it is",
    position: myLatlng,
  });
  infoWindow.open(map);
  // Configure the click listener.
  map.addListener("click", (mapsMouseEvent) => {
    
    const mark1 = new google.maps.Marker({
      position: mapsMouseEvent.latLng,
      map: map,
    });
    const myLatLang = dict["barrackStreet"];
    const mark2 = new google.maps.Marker({
      position: myLatLang,
      map: map,
    });  
    coords.push(myLatLang);
    coords.push(mapsMouseEvent.latLng);
    const linepath = new google.maps.Polyline(
      {
        path: coords,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
      }
    );
    linepath.setMap(map);
    //Next tell the user how far away they were
    //initMap()
  });
  
}
//PAGE LOADING INSTRUCTIONS
window.onload = function(){ 
  var info = document.getElementById("popup");
  var btn = document.getElementById("contin");

  window.onclick = function(event) {
    if(event.target == popup){
      info.style.display = "none";
    }
  }
  btn.onclick = function(event) {
    info.style.display = "none";
  }

}
/*
function distance(content) {
  if(confirm("Confirm answer?")){
    const correct = {"lat":51.893897,"lng":-8.477632};
    const user_answer = content;
  }
}*/


//LOCATIONS

var dict = {
  "barrackStreet":{"lat":51.893897,"lng":-8.477632},
};
/*
function addLatLng(event) {
  new google.maps.Marker({
    position: event,
    map: map,
  });
  //markers.push(marker);
  const path = poly.getPath();
  // Because path is an MVCArray, we can simply append a new coordinate
  // and it will automatically appear.
  path.push(event.latLng);
  // Add a new marker at the new plotted point on the polyline.
  new google.maps.Marker({
    position: event.latLng,
    title: "#" + path.getLength(),
    map: map,
  });
}*/