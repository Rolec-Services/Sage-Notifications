import { createClient } from "@libsql/client";

import axios from "axios";
import "dotenv/config";

export const getData = async () => {
  try {
    const response = await axios.get(
      "https://crm-proxy.rolec.app/crm/vcaseconnect",
      {
        headers: {
          Authorization: process.env.AUTHORIZATION,
          "x-authorization-token": process.env.X_AUTHORIZATION_TOKEN,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};

// URL: https://crm-proxy.rolec.app/crm/vperson?select=pers_emailaddress&where=pers_emailaddress eq '${email}'&orderby=pers_updateddate desc
// URL: https://crm-proxy.rolec.app/crm/vcaseconnect?where=case_sc_installer eq '${installerID}'

// export const turso = createClient({
//   url: "libsql://connect-dev-2-rolecservices.turso.io",
//   authToken:
//     "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MzYyODQxODAsImlkIjoiNmMzZDBjNTItMGQzMS00MmMyLWJjMDItZTNhODg5MzlkMWRiIn0.PeuTWs2-cLla-OAnlDceS8Tiy9X-QO2UQAHI2nbSc8_2ErIPwv64U0OJi1H9l3XEuHN6fuw8n4JmBvvpqFE2DQ",
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
//     console.log(JSON.parse(JSON.stringify(result)));
//   } catch (error) {
//     console.error("Error executing query", error);
//   }
// }

// executeQuery();

/*-----------------Fetching data from the sage-database:-----------------*/

async function fetchData() {
  try {
    const data = await getData();
    console.log("Fetched data:", data);
  } catch (error) {
    console.error("Error fetching data", error);
  }
}

fetchData();

/*-------------------------------------------END--------------------------------------------*/
