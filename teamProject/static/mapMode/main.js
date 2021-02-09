let map;

function initMap() {
  const myLatlng = { lat: 51.8985, lng: -8.4756 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    draggableCursor: 'crosshair',
    center: myLatlng,
  });
  // Create the initial InfoWindow.
  let infoWindow = new google.maps.InfoWindow({
    content: "Click where you think it is",
    position: myLatlng,
  });
  infoWindow.open(map);
  // Configure the click listener.
  map.addListener("click", (mapsMouseEvent) => {
    // Close the current InfoWindow.
    infoWindow.close();
    // Create a new InfoWindow.
    infoWindow = new google.maps.InfoWindow({
      position: mapsMouseEvent.latLng,
    });
    infoWindow.setContent(
      JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2),
    
    );
    infoWindow.open(map);
  });
}

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

};

