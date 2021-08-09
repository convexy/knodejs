const express = require("express");
const performance = require("perf_hooks").performance;

const app = express();
const port = 8080;

app.use(express.static(`${__dirname}/htdocs`))

let x = 0;
let y = 0;

let now = performance.now();
let last = performance.now();
function AdvanceTime() {
  let now = performance.now();
  let dt = now - last;
  x += 0.001 * dt;
  y += 0.001 * dt;
  last = now;
}

setInterval(AdvanceTime, 17);


app.get("/data", (req, res) => {
  if (req.query.req == "rot") {
    res.json({ x: x, y: y });
  }
  else {
    res.send("Hello " + req.query.name);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
