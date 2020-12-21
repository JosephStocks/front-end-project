$.getJSON(
    "https://opendata.arcgis.com/datasets/e2826101978143b9beb39d52ead86019_0.geojson"
) // fetch specific character data object
    .done((data) => {
        console.log(data);
        let oneDistrict = data.features;
        console.log(oneDistrict);
        loadMap(oneDistrict);
    });

const loadMap = (geojsonObject) => {
    mapboxgl.accessToken =
        "pk.eyJ1IjoianBzdG9ja3M2MyIsImEiOiJja2l5d2NhMWcxMWg0MnFteWEzeTJuamEyIn0.PdNZpYTkVaLLuCScXpjxiw";
    var map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-95.36776743580762, 29.771805275841665],
        zoom: 10,
    });

    map.on("load", function () {
        map.addSource("national-park", {
            type: "geojson",
            data: {
                type: "FeatureCollection",
                features: geojsonObject,
            },
        });

        map.addLayer({
            id: "park-boundary",
            type: "fill",
            source: "national-park",
            paint: {
                "fill-color": "#888888",
                "fill-opacity": 0.4,
            },
            filter: ["==", "$type", "Polygon"],
        });

        map.addLayer({
            id: "park-volcanoes",
            type: "circle",
            source: "national-park",
            paint: {
                "circle-radius": 6,
                "circle-color": "#B42222",
            },
            filter: ["==", "$type", "Point"],
        });
    });
};
