import axios from 'axios';
import {onesignalConfig} from '../config/onesignal.ts';

/**
 * Send a notification to the user
 * @param receiverFcmToken
 * @param heading
 * @param message
 */
export const sendNotification = async ({
  receiverFcmToken,
  heading,
  message,
}: {
  receiverFcmToken: any;
  heading: string;
  message: string;
}) => {
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    Authorization: `Basic ${onesignalConfig.apiKey}`,
  };

  // Prepare the data to send
  const data = {
    app_id: onesignalConfig.appId,
    target_channel: 'push',
    include_aliases: {
      external_id: [receiverFcmToken],
    },
    contents: {en: message},
    headings: {en: heading},
  };

  // Send the notification
  try {
    await axios.post('https://onesignal.com/api/v1/notifications', data, {
      headers,
    });
  } catch (error: unknown) {
    console.error(error);
  }
};
