/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RootStackParamList} from './src/types.ts';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/screens/login.screen.tsx';
import SignUpScreen from './src/screens/sign-up.screen.tsx';
import {PaperProvider} from 'react-native-paper';
import ChatsScreen from './src/screens/chats.screen.tsx';
import PickReceiverScreen from './src/screens/pick-receiver.screen.tsx';
import ChatScreen from './src/screens/chat.screen.tsx';
import {LogLevel, OneSignal} from 'react-native-onesignal';
import {onesignalConfig} from './src/config/onesignal.ts';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  useEffect(() => {
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);

    // OneSignal Initialization
    OneSignal.initialize(onesignalConfig.appId);

    // requestPermission will show the native iOS or Android notification permission prompt.
    // We recommend removing the following code and instead using an In-App Message to prompt for notification permission
    OneSignal.Notifications.requestPermission(true);

    // Method for listening for notification clicks
    OneSignal.Notifications.addEventListener('click', event => {
      console.log('OneSignal: notification clicked:', event);
    });
  }, []);

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Chats" component={ChatsScreen} />
          <Stack.Screen name="PickReceiver" component={PickReceiverScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
