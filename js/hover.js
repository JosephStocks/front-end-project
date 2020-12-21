$.getJSON(
    "https://opendata.arcgis.com/datasets/e2826101978143b9beb39d52ead86019_0.geojson"
) // fetch specific character data object
    .done((data) => {
        console.log(data);
        let allDistrictsObj = data.features;
        console.log(allDistrictsObj);
        let modifiedDistrictsObj = addIDtoEachDistrict(allDistrictsObj);
        // console.log(modifiedDistrictsObj);
        loadMap(modifiedDistrictsObj);
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
    var hoveredStateId = null;
    map.on("load", function () {
        map.addSource("district-outline-data", {
            type: "geojson",
            data: {
                type: "FeatureCollection",
                features: geojsonObject,
            },
        });

        map.addLayer({
            id: "district-fills",
            type: "fill",
            source: "district-outline-data",
            layout: {},
            paint: {
                "fill-color": "#627BC1",
                "fill-opacity": [
                    "case",
                    ["boolean", ["feature-state", "hover"], false],
                    1,
                    0.5,
                ],
            },
        });

        map.addLayer({
            id: "district-borders",
            type: "line",
            source: "district-outline-data",
            layout: {},
            paint: {
                "line-color": "#627BC1",
                "line-width": 2,
            },
        });

        // When the user moves their mouse over the state-fill layer, we'll update the
        // feature state for the feature under the mouse.
        map.on("mousemove", "district-fills", function (e) {
            if (e.features.length > 0) {
                if (hoveredStateId) {
                    map.setFeatureState(
                        { source: "district-outline-data", id: hoveredStateId },
                        { hover: false }
                    );
                }
                console.log(e.features[0].id);
                hoveredStateId = e.features[0].id;
                // hoveredStateId = e.features[0].properties.DISTRICT;
                map.setFeatureState(
                    { source: "district-outline-data", id: hoveredStateId },
                    { hover: true }
                );
            }
        });

        // When the mouse leaves the state-fill layer, update the feature state of the
        // previously hovered feature.
        map.on("mouseleave", "district-fills", function () {
            if (hoveredStateId) {
                map.setFeatureState(
                    { source: "district-outline-data", id: hoveredStateId },
                    { hover: false }
                );
            }
            hoveredStateId = null;
        });
    });
};

const addIDtoEachDistrict = (districtsArr) => {
    for (const districtJSON of districtsArr) {
        // districtJSON.id = districtJSON.properties.DISTRICT;
        districtJSON.id = districtJSON.properties.OBJECTID;
    }
    return districtsArr;
};
