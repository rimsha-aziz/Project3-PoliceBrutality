function makeMyMap(idCSS) {
  var myMap = L.map(idCSS, {
    center: [39.83, -98.58],
    zoom: 4
  });
  return myMap
}

// Create map
var myMap1 = makeMyMap("map1");

// Adding tile layer to maps
var tileLayer = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
})

tileLayer.addTo(myMap1)

// Function that loads data from flask for each race
var races = ['White', 'Black', 'Hispanic', 'Asian',]
races.forEach(race => {
  d3.json(`/2015killings/${race}`, data => {
    myResults = data.results 

    for (var i=0;i<myResults.length;i++){
      var location = myResults[i];
      var lat=location.latitude;
      var long=location.longitude;
      var state=location.state;
      var race= location.race;
      L.marker([lat,long]).bindPopup(`<h1>Lat=${lat}</h1>`+
      `<h2>Long=${long}</h2>`+
      `<h3>State=${state}</h3>`+
      `<h4>Race=${race}</h4>` +
      `<img src="https://media.torchbox.com/original_images/blm.jpeg" height="25px" width="25px">`)
      .addTo(myMap1)
      }
  })
});