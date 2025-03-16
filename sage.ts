import { getData } from "./getData";
import { createClient } from "@libsql/client";

/*-----------------Fetching data from the sage-database:-----------------*/

// async function fetchData() {
//   try {
//     const data = await getData();
//     const resources = data.$resources;
//     console.log("Data:", resources);
//     if (resources && resources.length > 0) {
//       const caseDetails = resources.map((item: any) => ({
//         caseId: item.Case_CaseId,
//         installerId: item.case_sc_installer,
//       }));
//       console.log("Case Details:", caseDetails);
//     } else {
//       console.log("No resources found.");
//     }
//   } catch (error) {
//     console.error("Error fetching data", error);
//   }
// }

// setInterval(() => {
//   console.log("Fetching data...");
//   fetchData();
// }, 900000);

// Initial fetch
// fetchData();

/*-------------------------------------------END--------------------------------------------*/

/*--------------Connection to the turso-database:-----------------*/

export const turso = createClient({
  url: "libsql://connect-dev-2-rolecservices.turso.io",
  authToken:
    "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MzYyODQxODAsImlkIjoiNmMzZDBjNTItMGQzMS00MmMyLWJjMDItZTNhODg5MzlkMWRiIn0.PeuTWs2-cLla-OAnlDceS8Tiy9X-QO2UQAHI2nbSc8_2ErIPwv64U0OJi1H9l3XEuHN6fuw8n4JmBvvpqFE2DQ",
});

async function executeQuery() {
  try {
    const result = await turso.execute(`
      SELECT user.id, pushNotificationsToken, sage_person_id
      FROM electrician
      JOIN external_type ON electrician.uuid= external_type.electrician_uuid
      JOIN external ON external_type.external_uuid = external.uuid
      JOIN user ON external.user_id = user.id
      `);
    console.log(JSON.parse(JSON.stringify(result)));
  } catch (error) {
    console.error("Error executing query", error);
  }
}

executeQuery();
/*--------------------------------END---------------------------------*/
