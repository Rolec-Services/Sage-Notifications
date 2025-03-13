import axios from "axios";
import "dotenv/config";

export const getData = async () => {
  try {
    const response = await axios.get(
      "https://crm-proxy.rolec.app/crm/vperson?where=pers_emailaddress eq 'shankaruday443@gmail.com'&select=pers_title,pers_firstname,pers_lastname,pers_emailaddress,pers_phonenumber,pers_companyid,pers_primaryaddressid,pers_c_companyname,pers_type,pers_status,pers_createddate,pers_updateddate",
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

/*-----------------Fetching the sage person ID:-----------------*/
// URL: https://crm-proxy.rolec.app/crm/vperson?select=pers_emailaddress&where=pers_emailaddress eq '${email}'&orderby=pers_updateddate desc
/*----------------------END----------------------*/

/*-----------------Filter out the specific installer:-----------------*/
// URL: https://crm-proxy.rolec.app/crm/vcaseconnect?where=case_sc_installer eq '${installerID}'
/*----------------------END----------------------*/

/*-----------------Fetching the installers Details:-----------------*/
// "https://crm-proxy.rolec.app/crm/vperson?where=pers_emailaddress eq 'shankaruday443@gmail.com'&select=pers_title,pers_firstname,pers_lastname,pers_emailaddress,pers_phonenumber,pers_companyid,pers_primaryaddressid,pers_c_companyname,pers_type,pers_status,pers_createddate,pers_updateddate",
/*----------------------END----------------------*/
