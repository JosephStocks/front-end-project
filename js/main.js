// mapboxgl.accessToken =
//     "pk.eyJ1IjoianBzdG9ja3M2MyIsImEiOiJja2l5d2NhMWcxMWg0MnFteWEzeTJuamEyIn0.PdNZpYTkVaLLuCScXpjxiw";
// var map = new mapboxgl.Map({
//     container: "map",
//     // style: 'mapbox://styles/mapbox/light-v10',
//     style: "mapbox://styles/mapbox/dark-v10",
//     center: [-95.3858, 29.69729],
//     zoom: 13,
// });

// // map.on("load", function () {
// //     // Add an image to use as a custom marker
// //     map.loadImage(
// //         "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
// //         function (error, image) {
// //             if (error) throw error;
// //             map.addImage("custom-marker", image);
// //             // Add a GeoJSON source with 2 points
// //             map.addSource("points", {
// //                 type: "geojson",
// //                 data: {
// //                     type: "FeatureCollection",
// //                     features: [
// //                         {
// //                             // feature for Mapbox DC
// //                             type: "Feature",
// //                             geometry: {
// //                                 type: "Point",
// //                                 coordinates: [
// //                                     -77.03238901390978,
// //                                     38.913188059745586,
// //                                 ],
// //                             },
// //                             properties: {
// //                                 title: "Mapbox DC",
// //                             },
// //                         },
// //                         {
// //                             // feature for Mapbox SF
// //                             type: "Feature",
// //                             geometry: {
// //                                 type: "Point",
// //                                 coordinates: [-122.414, 37.776],
// //                             },
// //                             properties: {
// //                                 title: "Mapbox SF",
// //                             },
// //                         },
// //                     ],
// //                 },
// //             });

// //             // Add a symbol layer
// //             map.addLayer({
// //                 id: "points",
// //                 type: "symbol",
// //                 source: "points",
// //                 layout: {
// //                     "icon-image": "custom-marker",
// //                     // get the title name from the source's "title" property
// //                     "text-field": ["get", "title"],
// //                     "text-font": [
// //                         "Open Sans Semibold",
// //                         "Arial Unicode MS Bold",
// //                     ],
// //                     "text-offset": [0, 1.25],
// //                     "text-anchor": "top",
// //                 },
// //             });
// //         }
// //     );
// // });
// // map.on("load", function () {
// //     var url =
// //         "https://opendata.arcgis.com/datasets/e2826101978143b9beb39d52ead86019_0.geojson";
// //     map.addSource("source_id", { type: "geojson", data: url });
// // });
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