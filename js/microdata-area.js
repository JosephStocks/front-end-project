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
                    0.85,
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

                let convertedData = IdStatsObj[dataKey].map((element) =>
                    Number(element)
                );
                console.log(`converted Data: ${convertedData}`);

                let [
                    totalPop,
                    malePop,
                    femalePop,
                    medianAge,
                    indIncome,
                    medianIncome,
                    whitePop,
                    blackPop,
                    asianPop,
                    nativePop,
                    islanderPop,
                    otherPop,
                    belowHighschool,
                    highSchoolEquiv,
                    someCollege,
                    bachelors,
                    graduateProf,
                    totalEdu,
                ] = convertedData;

                document.getElementById(
                    "totalPop"
                ).textContent = totalPop.toLocaleString();
                // document.getElementById("malePop").textContent = malePop;
                // document.getElementById("femalePop").textContent = femalePop;
                document.getElementById("medianAge").textContent = medianAge;
                document.getElementById(
                    "indIncome"
                ).textContent = indIncome.toLocaleString();
                document.getElementById(
                    "medianIncome"
                ).textContent = medianIncome.toLocaleString();

                document.getElementById(
                    "totalRace"
                ).textContent = `${totalPop.toLocaleString()}`;
                document.getElementById("whitePop").textContent = `${(
                    (whitePop / totalPop) *
                    100
                ).toFixed(2)}% (${whitePop.toLocaleString()})`;
                document.getElementById("blackPop").textContent = `${(
                    (blackPop / totalPop) *
                    100
                ).toFixed(2)}% (${blackPop.toLocaleString()})`;
                document.getElementById("asianPop").textContent = `${(
                    (asianPop / totalPop) *
                    100
                ).toFixed(2)}% (${asianPop.toLocaleString()})`;
                document.getElementById("nativePop").textContent = `${(
                    (nativePop / totalPop) *
                    100
                ).toFixed(2)}% (${nativePop.toLocaleString()})`;
                document.getElementById("islanderPop").textContent = `${(
                    (islanderPop / totalPop) *
                    100
                ).toFixed(2)}% (${islanderPop.toLocaleString()})`;
                document.getElementById("otherPop").textContent = `${(
                    (otherPop / totalPop) *
                    100
                ).toFixed(2)}% (${otherPop.toLocaleString()})`;

                document.getElementById(
                    "totalEdu"
                ).textContent = `${totalEdu.toLocaleString()}`;
                document.getElementById("belowHighschool").textContent = `${(
                    (belowHighschool / totalEdu) *
                    100
                ).toFixed(2)}% (${belowHighschool.toLocaleString()})`;
                document.getElementById("highSchoolEquiv").textContent = `${(
                    (highSchoolEquiv / totalEdu) *
                    100
                ).toFixed(2)}% (${highSchoolEquiv.toLocaleString()})`;
                document.getElementById("someCollege").textContent = `${(
                    (someCollege / totalEdu) *
                    100
                ).toFixed(2)}% (${someCollege.toLocaleString()})`;
                document.getElementById("bachelors").textContent = `${(
                    (bachelors / totalEdu) *
                    100
                ).toFixed(2)}% (${bachelors.toLocaleString()})`;
                document.getElementById("graduateProf").textContent = `${(
                    (graduateProf / totalEdu) *
                    100
                ).toFixed(2)}% (${graduateProf.toLocaleString()})`;
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
