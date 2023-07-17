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

export class Earthquake {
    place:string
    time:number
    geometry:Geometry
    constructor(place: string, time: number,geometry:Geometry)
    {
        this.place = place;
        this.time = time;
        this.geometry = geometry;
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
}
