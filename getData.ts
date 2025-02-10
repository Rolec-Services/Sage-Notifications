import axios from "axios";

export const getData = async () => {
  try {
    const response = await axios.get(
      "https://crm-proxy.rolec-test.app/crm/vcaseconnect",
      {
        headers: {
          Authorization: "Basic ZGV2ZWxvcG1lbnQ6QWJjZDEyMzQ=",
          "x-authorization-token": "QBaAsRkA9eCrOYAJmP96LG16f8aoxxYV",
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};
