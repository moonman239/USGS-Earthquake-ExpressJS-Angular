const earthquakes = require("../earthquakes");
test("gets all earthquakes between 2014-01-01 and 2014-01-02.",async ()=>{
    const startDate = new Date("2014-01-01");
    const endDate = new Date("2014-01-02");
    const eq = await earthquakes.getEarthquakes(startDate,endDate);
    console.log(JSON.stringify(eq));
    expect(eq[0].properties.place).toBe("10km SSW of Idyllwild, CA");
    expect(eq[eq.length - 1].properties.time).toBe(1388534476610);
})