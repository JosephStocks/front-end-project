$.getJSON(
    "https://api.census.gov/data/2019/acs/acs5?get=NAME,B07009_001E,B07009_002E,B01001_001E&for=public%20use%20microdata%20area:*&in=state:48&key=edf70f15a37d771191e6f4d62aab1871d9182206"
) // fetch specific character data object
    .done((data) => {
        console.log(data);
    });