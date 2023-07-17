import { Earthquake } from "../earthquakes";
test("gets all earthquakes between 2014-01-01 and 2014-01-02.",async ()=>{
    const startDate = new Date("2014-01-01");
    const endDate = new Date("2014-01-02");
    const eq: Earthquake[] = await Earthquake.getEarthquakes(startDate,endDate);
    console.log(JSON.stringify(eq));
    expect(eq[0].place).toBe("10km SSW of Idyllwild, CA");
    expect(eq[eq.length - 1].time).toBe(1388534476610);
});
test("distance function calculates haversine distance",()=>{
    const eq = new Earthquake("",0,{coordinates: [-98.73,29.48]});
    console.log(eq)
    expect(eq.distance(0,0)).toBeCloseTo(10850,-2);
});
test("filter by distance",()=>{
    const eqs = [new Earthquake("",0,{coordinates: [-98.73,29.48]}),new Earthquake("",0,{coordinates:[0,0]})];
    const filteredEqs = Earthquake.withinRadius(eqs,0.0175,0.0175,200);
    expect(filteredEqs.length).toBe(1);

})