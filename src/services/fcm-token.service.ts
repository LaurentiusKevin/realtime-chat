import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';
import {OneSignal} from 'react-native-onesignal';

/**
 * Generate FCM token for the current user
 * and save it to Firestore.
 */
export async function generateFcmToken() {
  const user = auth().currentUser;

  // Check if user is logged in
  if (user) {
    // Request user permission to send notifications
    if (await requestUserPermission()) {
      // Get FCM token
      const fcmToken = await messaging().getToken();

      // Check if FCM token is available
      if (fcmToken) {
        // Login to OneSignal
        OneSignal.login(fcmToken);

        // Save FCM token to Firestore
        const userDocRef = firestore().collection('users').doc(user.uid);

        // Check if user document exists
        const userDoc = await userDocRef.get();

        // Update or create user document
        if (userDoc.exists) {
          await userDocRef.update({
            email: user.email,
            fcmToken: fcmToken,
          });
        } else {
          await userDocRef.set({
            fcmToken: fcmToken,
            email: user.email,
          });
        }
      }
    }
  }
}

/**
 * Request user permission to send notifications.
 */
const requestUserPermission = async () => {
  // Check if user has already granted permission
  const authStatus = await messaging().requestPermission();

  // Return true if user has granted permission
  return (
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL
  );
};
