const { Expo } = require("expo-server-sdk");

let expo = new Expo();

interface Message {
  to: string;
  sound: string;
  title: string;
  body: string;
  data: { [key: string]: any };
}

async function sendPushNotification(expoPushToken: string): Promise<void> {
  let messages: Message[] = [];
  if (!Expo.isExpoPushToken(expoPushToken)) {
    console.error(`Push token ${expoPushToken} is not a valid Expo push token`);
    return;
  }

  messages.push({
    to: expoPushToken,
    sound: "default",
    title: "Original Title uday ",
    body: "And here is the body!",
    data: { someData: "goes here" },
  });

  let chunks: Message[][] = expo.chunkPushNotifications(messages);
  let tickets: any[] = [];
  (async () => {
    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log(ticketChunk);
        tickets.push(...ticketChunk);
      } catch (error) {
        console.error(error);
      }
    }
  })();
}

sendPushNotification("ExponentPushToken[o3B8HDFNrPvWr6VtfJ1451]");
