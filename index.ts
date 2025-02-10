import express from "express";
import bodyParser from "body-parser";
import { getData } from "./getData";
const app = express();
app.use(bodyParser.json());
const port = 8080;

app.get("/", async (req, res) => {
  try {
    const data = await getData();
    res.send(data);
  } catch (error) {
    res.status(500).send("Error fetching data");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

setInterval(async () => {
  try {
    await getData();
  } catch (error) {
    console.error("Error in periodic fetch", error);
  }
}, 5000);

export { app };
