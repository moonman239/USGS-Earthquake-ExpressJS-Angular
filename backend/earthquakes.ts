import fetch from "node-fetch-commonjs";
type Geometry = {coordinates: number[]};
function radians(degrees: number)
{
  return degrees * Math.PI / 180;
}

class Feature
{
    properties:
        {place: string, time: number, geometry: Geometry}
};

function haversine(rad: number)
{
    return Math.pow(Math.sin(rad/2),2);
}
export class Earthquake {
    place:string
    time:number
    latitude:number
    longitude:number
    constructor(place: string, time: number,geometry:Geometry)
    {
        this.place = place;
        this.time = time;
        this.latitude = radians(geometry.coordinates[1]);
        this.longitude = radians(geometry.coordinates[0]);
    }
    public static async getEarthquakes(startDate: Date,endDate: Date)
    {
        const url = new URL("https://earthquake.usgs.gov/fdsnws/event/1/query")
        url.searchParams.append("format","geojson");
        url.searchParams.append("starttime",startDate.toISOString());
        url.searchParams.append("endtime",endDate.toISOString());
        const response = await fetch(url);
        if (!response.ok)
            throw new Error("Error " + response.status + ": " + response.statusText);
        const json = await response.json() as {features: Feature[]};
        if (!json.features)
            throw new Error("invalid json ");
        return json.features.map((obj)=>new Earthquake(obj.properties.place,obj.properties.time,obj.properties.geometry));
    }
    distance(lat1:number,lon1:number): number // lat1 and lon1 should be in degrees
    {
        lat1 = radians(lat1);
        lon1 = radians(lon1);
        const trig = haversine(this.latitude - lat1) + Math.cos(lat1) * Math.cos(this.latitude) * haversine(this.longitude - lon1);
        return 2 * 6371.008 * Math.asin(Math.sqrt(trig));
    }
}
