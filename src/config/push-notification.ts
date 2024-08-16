import PushNotification from 'react-native-push-notification';

// Configure push notifications (you can place this in your app's entry file)
PushNotification.configure({
  onNotification: function (notification: any) {
    console.log('LOCAL NOTIFICATION ==>', notification);
  },
  popInitialNotification: true,
  requestPermissions: true,
});
