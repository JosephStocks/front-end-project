let microAreaIds = [
    "04601",
    "04602",
    "04603",
    "04604",
    "04605",
    "04606",
    "04607",
    "04608",
    "04609",
    "04610",
    "04611",
    "04612",
    "04613",
    "04614",
    "04615",
    "04616",
    "04617",
    "04618",
    "04619",
];

let IdStatsObj = {};

var censusCodeArr = [
    // { name: "population", code: "B01003_001E" },
    // { name: "Total Race Population", code: "B02001_001E" },
    // { name: "malePop", code: "B01001_002E" },
    // { name: "femalePop", code: "B01001_026E" },
    // { name: "mAge", code: "B01002_001E" },
    {
        fullName: "Individual Income by Birth Place",
        keyID: "incomeByBirth",
        code: "B06010_001E",
    },
    { fullName: "Individual Income", keyID: "income", code: "B07010_001E" },
    { fullName: "Median Income", keyID: "medianIncome", code: "B07011_001E" },

    // { name: "whitePop", code: "B02001_002E", fullName: "White" },
    // {
    //     name: "blackPop",
    //     code: "B02001_003E",
    //     fullName: "Black/African American",
    // },
    // { name: "asianPop", code: "B02001_005E", fullName: "Asian" },
    // { name: "nativePop", code: "B02001_004E", fullName: "American Indian" },
    // { name: "islanderPop", code: "B02001_006E", fullName: "Pacific Islander" },
    // { name: "otherPop", code: "B02001_007E" },
    // { name: "belowHighschool", code: "B07009_002E" },
    // { name: "highshoolEquiv", code: "B07009_003E" },
    // { name: "someCollege", code: "B07009_004E" },
    // { name: "bachelors", code: "B07009_005E" },
    // { name: "graduateProf", code: "B07009_006E" },
];

let codesArr = censusCodeArr.map((censusElementObj) => censusElementObj.code);
let codeArrStr = codesArr.join(",");

let harrisCountyAreasArr;
let data2;

$.getJSON(
    `https://api.census.gov/data/2019/acs/acs5?get=NAME,${codeArrStr}&for=public%20use%20microdata%20area:*&in=state:48&key=edf70f15a37d771191e6f4d62aab1871d9182206`
) // fetch specific character data object
    .done((data) => {
        // console.log(data);
        data2 = data;
        harrisCountyAreasArr = data.filter((microDataArr) => {
            return microAreaIds.includes(microDataArr.slice(-1)[0]);
        });
        harrisCountyAreasArr.forEach((arr) => {
            let tempId = arr.slice(-1)[0];
            IdStatsObj[tempId] = arr.slice(0, -1);
        });
        console.log(harrisCountyAreasArr);
    });
