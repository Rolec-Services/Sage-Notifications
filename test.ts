import { createClient } from "@libsql/client";

import axios from "axios";
import "dotenv/config";

export const getData = async () => {
  try {
    const response = await axios.get(
      "https://crm-proxy.rolec.app/crm/vcaseconnect?where=case_sc_installer eq '50337'",
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

async function fetchData() {
  try {
    const data = await getData();
    console.log("Fetched data:", data);
  } catch (error) {
    console.error("Error fetching data", error);
  }
}

fetchData();
