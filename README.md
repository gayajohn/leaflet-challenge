# Module 15: Leaflet Challenge

## App Access

https://gayajohn.github.io/earthquake-app/

<img width="957" alt="image" src="https://github.com/gayajohn/leaflet-challenge/assets/135036996/4be9db27-ba5a-47c9-a1cc-25b849a09a0c">


## Table of Contents

- static folder which contains 
    - css folder which contains style.css file, which is the CSS script for the app
    - js folder which contains logic.js file, which is the JS script for the app 
- index.html file which contains the html script for the dashboard

## Challenge Objective

The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. 
The objective of this challenge was to extract earthquake data from the their USGS GeoJSON feed on earthquakes from the past 7 days (https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson) and map them out on a world map. 
The markers  reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes will appear larger, and earthquakes with greater depth will appear darker in color. 
The map also includes popups that provide additional information on the magnitude, depth and location of the earthquake when its associated marker is clicked.

## Packages Used

- Leaflet.js: To create interactive map (https://leafletjs.com/reference.html)

- D3.js: To read JSON url (https://d3js.org/)

- Chroma.js: To create color scale (https://gka.github.io/chroma.js/)

## References

- Dataset Reference

    Dataset created by the United States Geological Survey. https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php 

    URL used to pull in data:

    https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson

- Code References

    https://leafletjs.com/examples/choropleth/#custom-legend-control

    https://cran.r-project.org/web/packages/viridis/vignettes/intro-to-viridis.html

    https://www.computerhope.com/htmcolor.htm

    https://gka.github.io/chroma.js/#chroma-scale

    referenced code:

        // function to select color of marker based on earthquake depth
        function selectColor(depth){
        let colorScale = chroma.scale(['#E0FFFF','#01F9C6','#008080','#045F5F','#033E3E', 'black']).domain([-10, 10, 30, 50, 70, 90]);
        return colorScale(depth).hex();
        };


        // create a legend HTML content
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

        // Add legend as a custom control to the map
        const legendControl = L.control({ position: 'bottomright' });
        legendControl.onAdd = function (map) {
        const div = L.DomUtil.create('div', 'legend');
        div.innerHTML = legendHTML;
        return div;
        };
        legendControl.addTo(myMap);

