$.getJSON(
    "https://raw.githubusercontent.com/uscensusbureau/citysdk/master/v2/GeoJSON/500k/2019/48/public-use-microdata-area.json"
).done((data) => {
    console.log(data);
    let microdataAreasArr = data.features;
    console.log(microdataAreasArr);
    microdataAreasArr = addIDtoEachMicroArea(microdataAreasArr);

    harrisCountyAreasArr = microdataAreasArr.filter((microDataObj) => {
        return microAreaIds.includes(microDataObj.properties.PUMACE10);
    });

    loadMap(harrisCountyAreasArr);
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
                let targetObj = e.features[0];
                console.log(targetObj);

                hoveredStateId = e.features[0].id;
                let dataKey = hoveredStateId.toString().padStart(5, "0");
                console.log(IdStatsObj[dataKey]);
                document.getElementById("pop").textContent = Number(
                    IdStatsObj[dataKey][1]
                ).toLocaleString();
                document.getElementById("incomeByBirth").textContent = Number(
                    IdStatsObj[dataKey][6]
                ).toLocaleString();
                document.getElementById("income").textContent = Number(
                    IdStatsObj[dataKey][7]
                ).toLocaleString();
                document.getElementById("medianIncome").textContent = Number(
                    IdStatsObj[dataKey][8]
                ).toLocaleString();
                
                document.getElementById("whitePop").textContent = Number(
                    IdStatsObj[dataKey][9]
                ).toLocaleString() + Number(
                    IdStatsObj[dataKey][9] / IdStatsObj[dataKey][1] * 100
                ).toLocaleString();

                document.getElementById("blackPop").textContent = Number(
                    IdStatsObj[dataKey][10]
                ).toLocaleString();
                document.getElementById("asianPop").textContent = Number(
                    IdStatsObj[dataKey][11]
                ).toLocaleString();
                document.getElementById("nativePop").textContent = Number(
                    IdStatsObj[dataKey][12]
                ).toLocaleString();
                document.getElementById("islanderPop").textContent = Number(
                    IdStatsObj[dataKey][13]
                ).toLocaleString();
                document.getElementById("otherPop").textContent = Number(
                    IdStatsObj[dataKey][14]
                ).toLocaleString();

                // console.log(hoveredStateId, targetObj.properties.PUMACE10);
                // hoveredStateId = e.features[0].properties.DISTRICT;
                map.setFeatureState(
                    { source: "neighborhood-outline-data", id: hoveredStateId },
                    { hover: true }
                );

                document
                    .getElementsByClassName("censusInfo")[0]
                    .classList.remove("invisible");
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

const addIDtoEachMicroArea = (districtsArr) => {
    for (const districtJSON of districtsArr) {
        // districtJSON.id = districtJSON.properties.DISTRICT;
        districtJSON.id = districtJSON.properties.PUMACE10;
    }
    return districtsArr;
};

var popDisplay = document.getElementById("pop");
var incDisplay = document.getElementById("inc");
var raceDisplay = document.getElementById("race");
var ageDisplay = document.getElementById("age");
var eduDisplay = document.getElementById("edu");

// EXPANDING/COLLAPSING SIDEBAR
/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("hamburger-button").classList.add("invisible");
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("hamburger-button").classList.remove("invisible");
}
