import { getData } from "./getData";
import { createClient } from "@libsql/client";

export const turso = createClient({
  url: "libsql://connect-rolecservices.turso.io",
  authToken:
    "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MzM4MzQ0OTcsImlkIjoiNDI4MjZkMTktZWY1Ny00OGIyLWI3OTEtNmVmYzFkMTk3M2U5In0.sZgED9XH18pfnIHUBpmbPGV7WHXztmGf9Yq8yOSRFldYyiJGYoEimfDf8hMvrhtDH5hnIivuCyO_1tSsh27WAQ",
});

async function executeQuery() {
  try {
    const result = await turso.execute(`
      SELECT electrician. *, external_type.*
      FROM electrician
      JOIN external_type ON electrician.uuid= external_type.electrician_uuid
      `);
    console.log(result);
  } catch (error) {
    console.error("Error executing query", error);
  }
}

executeQuery();

// async function fetchData() {
//   try {
//     const data = await getData();
//     console.log("Fetched data:", data);
//   } catch (error) {
//     console.error("Error fetching data", error);
//   }
// }

// // setInterval(() => {
// //   console.log("Fetching data...");
// //   fetchData();
// // }, 900000);

// // // Initial fetch
// fetchData();

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

/*-------------------------------------------------------------------------------------------------------------*/

/*-----------------------------Working with Expo Push Notifications:----------------------------------------------*/

// const { Expo } = require("expo-server-sdk");

// // Create a new Expo SDK client
// let expo = new Expo();

// // Function to send a push notification
// interface Message {
//   to: string;
//   sound: string;
//   title: string;
//   body: string;
//   data: { [key: string]: any };
// }

// async function sendPushNotification(expoPushToken: string): Promise<void> {
//   // Create the message
//   let messages: Message[] = [];
//   if (!Expo.isExpoPushToken(expoPushToken)) {
//     console.error(`Push token ${expoPushToken} is not a valid Expo push token`);
//     return;
//   }

//   messages.push({
//     to: expoPushToken,
//     sound: "default",
//     title: "Original Title uday ",
//     body: "And here is the body!",
//     data: { someData: "goes here" },
//   });

//   // Send the messages
//   let chunks: Message[][] = expo.chunkPushNotifications(messages);
//   let tickets: any[] = [];
//   (async () => {
//     for (let chunk of chunks) {
//       try {
//         let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
//         console.log(ticketChunk);
//         tickets.push(...ticketChunk);
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   })();
// }

// // Example usage
// sendPushNotification("ExponentPushToken[o3B8HDFNrPvWr6VtfJ1451]");

/*-------------------------------------------------------------------------------------------------------------*/

/*-----------------------------Working with Azure Push Notifications:----------------------------------------------*/

//working with Azure notifications hub
// const azure = require("azure-sb");

// // Replace with your Azure Notification Hub connection string and hub name
// const connectionString =
//   "Endpoint=sb://rg-3340-rolec-staging-sage-notifications.servicebus.windows.net/;SharedAccessKeyName=sage;SharedAccessKey=O9GR21yFin5UtRdsezIs3/KzkctUxmrXjqiQcQlqUVI=";
// const hubName = "sage-notifications-hub";

// // Create a new Notification Hub client
// const notificationHubService = azure.createNotificationHubService(
//   hubName,
//   connectionString
// );

// // Function to send a push notification
// async function sendPushNotification(expoPushToken: string) {
//   const payload = {
//     data: {
//       message: "Hello!",
//     },
//     expoPushToken,
//   };

//   notificationHubService.gcm.send(
//     expoPushToken,
//     payload,
//     function (error: any, result: any) {
//       if (error) {
//         console.error("Notification not sent", error);
//       } else {
//         console.log("Notification sent", result);
//       }
//     }
//   );
// }

// // Example usage
// sendPushNotification("ExponentPushToken[_9bcnfJcWsCfPAxereTx5N]");

/*-------------------------------------------------------------------------------------------------------------*/
