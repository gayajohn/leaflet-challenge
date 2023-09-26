
// setting the url to geoJSON
let url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

// choosing the centre of myMap to be Las Vegas, Nevada
let lasVegasCoords = [36.1716, -115.1391]

// adding the tile layers
let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
let dark = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', 
});
let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});


// function to create earthquake markers
function createMarkers(earthquakeData){
    // empty list to store earthquake markers
    let markersList = []

    // running through earthquake data to create circular markers
    earthquakeData.map(function(earthquake){
        let magnitude = earthquake.properties.mag;
        let depth = earthquake.geometry.coordinates[2];
        let location = [earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]]
    
        let marker = L.circle(location, {
            color: 'black', 
            fillColor: selectColor(depth), 
            weight: 1,
            fillOpacity: 1,
            radius: magnitude*15000
            }).bindPopup(`Magnitude: ${magnitude}<br>Depth: ${depth} km<br>Location: ${location}`)

        markersList.push(marker);
    })

    // creating a layer group from the markers
    let markers = L.layerGroup(markersList);
    // calling the function to create the map
    createMap(markers);
};

// function to create map
function createMap(markers){

    // setting base and overlay maps
    let baseMaps = {Street:street, Dark: dark, Topographic: topo};
    let overlayMaps = {"Eathquake Data": markers};

    // adding myMap to 'map' div
    let myMap = L.map("map", {
        center: lasVegasCoords,
        zoom: 5,
        layers: [street, markers]
      });
    L.control.layers(baseMaps, overlayMaps).addTo(myMap);  
    
    // code to create legend in html
    const legendHTML = `
        <div class="legend"> 
        <div class="legend-item">
            <div class="legend-color" style="background-color: ${selectColor(-10)};"></div>
            <span>-10 km to 10 km</span>
        </div>
        <div class="legend-item">
            <div class="legend-color" style="background-color: ${selectColor(10)};"></div>
            <span>10 km to 30 km</span>
        </div>
        <div class="legend-item">
            <div class="legend-color" style="background-color: ${selectColor(30)};"></div>
            <span>30 km to 50 km</span>
        </div>
        <div class="legend-item">
            <div class="legend-color" style="background-color: ${selectColor(50)};"></div>
            <span>50 km to 70 km</span>
        </div>
        <div class="legend-item">
            <div class="legend-color" style="background-color: ${selectColor(70)};"></div>
            <span>70 km to 90 km</span>
        </div>    
        <div class="legend-item">
            <div class="legend-color" style="background-color: ${selectColor(90)};"></div>
            <span>90+ km</span>
        </div>
            `

    // add legend as a custom control to the map
    const legendControl = L.control({ position: 'bottomright' });
    legendControl.onAdd = function (map) {
    const div = L.DomUtil.create('div', 'legend');
    div.innerHTML = legendHTML;
    return div;
    };
    legendControl.addTo(myMap); 
}


// function to select color of marker based on earthquake depth
function selectColor(depth){
    let colorScale = chroma.scale(['#E0FFFF','#01F9C6','#008080','#045F5F','#033E3E', 'black']).domain([-10, 10, 30, 50, 70, 90]);
    return colorScale(depth).hex();
};

// calling the url and running the createMarkers function
d3.json(url).then(function(data){
    createMarkers(data.features);      
})












