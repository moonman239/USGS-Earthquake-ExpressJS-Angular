
const express = require("express");
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  const startDate = new Date(req.query.start_date);
  const endDate = new Date(req.query.end_date);
  res.send(JSON.stringify({"start_date":startDate,"end_date":endDate}));
});


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});


