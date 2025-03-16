import axios from "axios";
import "dotenv/config";
import { createClient } from "@libsql/client";

export const turso = createClient({
  url: "libsql://connect-rolecservices.turso.io",
  authToken:
    "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MzM4MzQ0OTcsImlkIjoiNDI4MjZkMTktZWY1Ny00OGIyLWI3OTEtNmVmYzFkMTk3M2U5In0.sZgED9XH18pfnIHUBpmbPGV7WHXztmGf9Yq8yOSRFldYyiJGYoEimfDf8hMvrhtDH5hnIivuCyO_1tSsh27WAQ",
});

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

async function checkAndReturnPushNotificationToken(installerID: string) {
  try {
    const muResult = await turso.execute(`
      SELECT sage_person_id, 
      FROM electrician
      JOIN external_type ON electrician.uuid= external_type.electrician_uuid
      JOIN external ON external_type.external_uuid = external.uuid
      JOIN user ON external.user_id = user.id
      WHERE sage_person_id = '${installerID}'
    `);
    console.log(installerID);

    if (muResult) {
      console.log(JSON.parse(JSON.stringify(muResult)));
      return muResult;
    } else {
      console.log(`No matching installer ID found for ${installerID}`);
      return null;
    }
  } catch (error) {
    console.error("Error executing query", error);
    throw error;
  }
}

async function fetchDataAndCheck() {
  try {
    const data = await getData();
    const resources = data.$resources || [];

    for (const item of resources) {
      const installerID = item.case_sc_installer;
      const caseId = item.Case_CaseId;
      const token = await checkAndReturnPushNotificationToken(installerID);
      if (token) {
        console.log(
          `Push notification token for installer ${installerID} (Case ID: ${caseId}): ${token}`
        );
      }
    }
  } catch (error) {
    console.error("Error fetching data and checking", error);
  }
}

fetchDataAndCheck();
