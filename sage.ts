import { getData } from "./getData";
import { createClient } from "@libsql/client";

/*--------------Connection to the turso-database:-----------------*/

// export const turso = createClient({
//   url: "libsql://connect-rolecservices.turso.io",
//   authToken:
//     "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MzM4MzQ0OTcsImlkIjoiNDI4MjZkMTktZWY1Ny00OGIyLWI3OTEtNmVmYzFkMTk3M2U5In0.sZgED9XH18pfnIHUBpmbPGV7WHXztmGf9Yq8yOSRFldYyiJGYoEimfDf8hMvrhtDH5hnIivuCyO_1tSsh27WAQ",
// });

// async function executeQuery() {
//   try {
//     const result = await turso.execute(`
//       SELECT electrician.*, external_type.*, external.*, user.*
//       FROM electrician
//       JOIN external_type ON electrician.uuid= external_type.electrician_uuid
//       JOIN external ON external_type.external_uuid = external.uuid
//       JOIN user ON external.user_id = user.id
//       `);
//     console.log(JSON.stringify(result, null, 2));
//   } catch (error) {
//     console.error("Error executing query", error);
//   }
// }

// executeQuery();
/*--------------------------------END---------------------------------*/

/*-----------------Fetching data from the sage-database:-----------------*/

async function fetchData() {
  try {
    const data = await getData();
    console.log("Fetched data:", data);
  } catch (error) {
    console.error("Error fetching data", error);
  }
}

// setInterval(() => {
//   console.log("Fetching data...");
//   fetchData();
// }, 900000);

// // Initial fetch
fetchData();

/*-------------------------------------------END--------------------------------------------*/

/*--------------------------Using the Router Path-----------------------------*/

/*-----------------------------Connecting to the sage-database:----------------------------------------------*/
// import express from "express";
// import bodyParser from "body-parser";
// import { getData } from "./getData";
// const app = express();
// app.use(bodyParser.json());
// const port = 8080;

// app.get("/", async (req, res) => {
//   try {
//     const data = await getData();
//     res.send(data);
//   } catch (error) {
//     res.status(500).send("Error fetching data");
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

// setInterval(async () => {
//   try {
//     await getData();
//   } catch (error) {
//     console.error("Error in periodic fetch", error);
//   }
// }, 300000);

// export { app };

/*--------------------------------END---------------------------------*/
