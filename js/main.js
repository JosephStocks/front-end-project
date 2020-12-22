$.getJSON(
    "https://opendata.arcgis.com/datasets/e2826101978143b9beb39d52ead86019_0.geojson"
) // fetch specific character data object
    .done((data) => {
        console.log(data);
        let oneDistrict = data.features[0].geometry.coordinates;
        console.log(oneDistrict);
        loadMap(oneDistrict);
    });

const loadMap = (coordinatesArr) => {
    mapboxgl.accessToken =
        "pk.eyJ1IjoianBzdG9ja3M2MyIsImEiOiJja2l5d2NhMWcxMWg0MnFteWEzeTJuamEyIn0.PdNZpYTkVaLLuCScXpjxiw";

    var map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-95.36776743580762, 29.771805275841665],
        zoom: 10,
    });

    map.on("load", function () {
        map.addSource("firstdistrict", {
            type: "geojson",
            data: {
                type: "Feature",
                geometry: {
                    type: "Polygon",
                    coordinates: coordinatesArr,
                },
            },
        });
        map.addLayer({
            id: "firstdistrict",
            type: "fill",
            source: "firstdistrict",
            layout: {},
            paint: {
                "fill-color": "#088",
                "fill-opacity": 0.8,
            },
        });
    });
};


//Target relevant span tags in censusInfo div
var popDisplay = document.getElementById('pop');
var incDisplay = document.getElementById('inc');
var raceDisplay = document.getElementById('race');
var ageDisplay = document.getElementById('age');
var eduDisplay = document.getElementById('edu');