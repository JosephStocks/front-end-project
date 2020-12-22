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

var censusCodeArr = [
    { name: "population", code: "B01003_001E" },
    { name: "mAge", code: "B01002_001E" },
    { name: "mIncome", code: "B06010_001E" },
];

let codesArr = censusCodeArr.map((censusElementObj) => censusElementObj.code);
console.log(codesArr);
let codeArrStr = codesArr.join(",");

console.log(codesArr);
$.getJSON(
    `https://api.census.gov/data/2019/acs/acs5?get=NAME,${codeArrStr}&for=public%20use%20microdata%20area:*&in=state:48&key=edf70f15a37d771191e6f4d62aab1871d9182206`
) // fetch specific character data object
    .done((data) => {
        console.log(data);
        harrisCountyAreasArr = data.filter((microDataArr) => {
            return microAreaIds.includes(microDataArr.slice(-1)[0]);
        });
        console.log(harrisCountyAreasArr);
    });
