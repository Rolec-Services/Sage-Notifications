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
