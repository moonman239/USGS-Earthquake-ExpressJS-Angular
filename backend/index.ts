import { Earthquake } from "./earthquakes";

var express = require("express");
const app = express();
const port = 3000;
var earthquakes = require("./earthquakes");

app.get('/', async (req, res,next) => {
  const startDate = new Date(req.query.start_date);
  const endDate = new Date(req.query.end_date);
  res.send(JSON.stringify(await Earthquake.getEarthquakes(startDate,endDate)));
});



app.get('/near',async(req,res,next)=>{
  const startDate = new Date(req.query.start_date ? req.query.start_date : "1776-07-04");
  const endDate = new Date(req.query.end_date);
  const searchRadius = parseInt(req.query.search_radius); // miles
  // get haversine distance from location coords to earthquake
  const latitude = parseFloat(req.query.latitude);
  const longitude = parseFloat(req.query.longitude);
  try {
    const earthquakes = await Earthquake.getEarthquakes(startDate,endDate);
    const nearbyEarthquakes = Earthquake.withinRadius(earthquakes,latitude,longitude,searchRadius);
    res.send(JSON.stringify(nearbyEarthquakes));
  }
  catch (e)
  {
    next(e); // pass errors to Express
  }
})


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});


