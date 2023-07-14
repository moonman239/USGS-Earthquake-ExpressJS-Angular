const earthquakes = require("../earthquakes");
test("gets all earthquakes between 2014-01-01 and 2014-01-02.",async ()=>{
    const startDate = new Date("2014-01-01");
    const endDate = new Date("2014-01-02");
    const eq = await earthquakes.getEarthquakes(startDate,endDate);
    expect(eq[0].place).toBe("Central Alaska");
    expect(eq[-1].time).toBe(1388534476610);
})