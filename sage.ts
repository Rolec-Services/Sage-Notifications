import axios from "axios";
import "dotenv/config";
import { createClient } from "@libsql/client";

const tursoUrl = process.env.TURSO_DATABASE_URL;
const tursoAuthToken = process.env.TURSO_AUTH_TOKEN;

if (!tursoUrl || !tursoAuthToken) {
  throw new Error("invalid turso url or auth token");
}

export const turso = createClient({
  url: tursoUrl,
  authToken: tursoAuthToken,
});

if (!tursoUrl || !tursoAuthToken) {
  throw new Error("TURSO_URL or TURSO_AUTH_TOKEN is invalid.");
}

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
    const tursoData = await turso.execute(`
      SELECT sage_person_id
      FROM electrician
      JOIN external_type ON electrician.uuid= external_type.electrician_uuid
      JOIN external ON external_type.external_uuid = external.uuid
      JOIN user ON external.user_id = user.id
      WHERE sage_person_id = '${installerID}'
    `);
    console.log(installerID);

    if (tursoData) {
      console.log(JSON.parse(JSON.stringify(tursoData)));
      return tursoData;
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
