$.getJSON(
    "https://opendata.arcgis.com/datasets/deae15e7f3db4b198946c17f0d169c39_3.geojson"
) // fetch specific character data object
    .done((data) => {
        console.log(data);
        let allDistrictsObj = data.features;
        // console.log(allDistrictsObj);
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
        map.addSource("neighborhood-outline-data", {
            type: "geojson",
            data: {
                type: "FeatureCollection",
                features: geojsonObject,
            },
        });

        map.addLayer({
            id: "neighborhood-fills",
            type: "fill",
            source: "neighborhood-outline-data",
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
            id: "neighborhood-borders",
            type: "line",
            source: "neighborhood-outline-data",
            layout: {},
            paint: {
                "line-color": "#627BC1",
                "line-width": 2,
            },
        });

        // When the user moves their mouse over the state-fill layer, we'll update the
        // feature state for the feature under the mouse.
        map.on("mousemove", "neighborhood-fills", function (e) {
            if (e.features.length > 0) {
                if (hoveredStateId) {
                    map.setFeatureState(
                        {
                            source: "neighborhood-outline-data",
                            id: hoveredStateId,
                        },
                        { hover: false }
                    );
                }
                // console.log(e.features[0].id);
                let targetObj = e.features[0];
                console.log(targetObj);

                // let { DISTRICT, MEMBER, PHONE } = targetObj.properties;
                hoveredStateId = e.features[0].id;
                // hoveredStateId = e.features[0].properties.DISTRICT;
                map.setFeatureState(
                    { source: "neighborhood-outline-data", id: hoveredStateId },
                    { hover: true }
                );

                // // Shows the district data div only when hovered over a district
                // document.getElementById("member").textContent = MEMBER;
                // document.getElementById(
                //     "district-letter"
                // ).textContent = DISTRICT;
                // document.getElementById("phone").textContent = PHONE;

                // document
                //     .getElementsByClassName("censusInfo")[0]
                //     .classList.remove("invisible");
            }
        });

        // When the mouse leaves the state-fill layer, update the feature state of the
        // previously hovered feature.
        map.on("mouseleave", "neighborhood-fills", function () {
            if (hoveredStateId) {
                map.setFeatureState(
                    { source: "neighborhood-outline-data", id: hoveredStateId },
                    { hover: false }
                );
                // hides the data div when not on the highlighted district
                document
                    .getElementsByClassName("censusInfo")[0]
                    .classList.add("invisible");
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

var popDisplay = document.getElementById("pop");
var incDisplay = document.getElementById("inc");
var raceDisplay = document.getElementById("race");
var ageDisplay = document.getElementById("age");
var eduDisplay = document.getElementById("edu");
