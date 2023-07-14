type Earthquake = {
    place: string;
    time: number;
    updated: string;
    url: string;
    detail:string};
const fetch = require("node-fetch-commonjs");
export async function getEarthquakes(startDate: Date,endDate: Date)
{
    const url = new URL("https://earthquake.usgs.gov/fdsnws/event/1/query")
    url.searchParams.append("format","geojson");
    url.searchParams.append("starttime",startDate.toISOString());
    url.searchParams.append("endtime",endDate.toISOString());
    const response = await fetch(url);
    if (!response.ok)
        throw new Error("Error " + response.status + ": " + response.statusText);
    const json = await response.json();
    return json["features"];
}