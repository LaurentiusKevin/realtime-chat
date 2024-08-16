import {Dimensions, FlatList, Text, TouchableOpacity, View} from 'react-native';
import {Appbar, Icon, TextInput} from 'react-native-paper';
import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {getDateFormat} from '../utils/format-date.utils.ts';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {z} from 'zod';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Chat, ChatProps} from '../types.ts';
import {sendNotification} from '../services/send-notification.service.ts';
import {useThemeStyles} from '../hooks/useThemeStyle.ts';
import UpdateReadAtService from '../services/update-read-at.service.ts';

const InputType = z.object({
  message: z
    .string({required_error: 'Message is required'})
    .min(1, 'Username is required'),
});

const screenWidth = Dimensions.get('window').width;

/**
 * Chat Screen
 * @param navigation
 * @param route
 * @constructor
 */
export default function ChatScreen({navigation, route}: ChatProps) {
  const {id} = route.params;
  const {styles, colors, inputOutline, inputTheme, readIcon} = useThemeStyles();
  const [chats, setChats] = useState<Chat | undefined>(undefined);
  const [currentUser, setCurrentUser] = useState<FirebaseAuthTypes.User | null>(
    null,
  );

  // Form Hook
  const {control, handleSubmit, setValue} = useForm({
    resolver: zodResolver(InputType),
    defaultValues: {
      message: '',
    },
  });

  // Send Message
  const handleSendMessage = async (data: z.infer<typeof InputType>) => {
    // Get Chat Reference
    const chatRef = firestore().collection('chats').doc(id);

    // Get Receiver
    const receiver = await firestore()
      .collection('users')
      .where('email', '==', chats?.receiver)
      .limit(1)
      .get();

    // Create New Message
    const message = {
      message: data.message,
      createdAt: new Date(),
      sender: currentUser?.email,
    };

    // Update Chat
    await chatRef.update({
      messages: [message, ...(chats?.messages ?? [])],
    });

    // Send Notification
    if (receiver.docs.length > 0) {
      await sendNotification({
        receiverFcmToken: receiver.docs[0].data().fcmToken,
        heading: 'New Message from ' + currentUser?.email,
        message: data.message,
      });
    }

    setValue('message', '');
  };

  // Get Current User
  useEffect(() => {
    const unsubscribeAuth = auth().onAuthStateChanged(user => {
      setCurrentUser(user);
    });

    return () => unsubscribeAuth(); // Clean up the subscription on unmount
  }, []);

  // Get Chat Data
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('chats')
      .doc(id)
      .onSnapshot(querySnapshot => {
        const chatData = querySnapshot.data() as Chat;

        // Get Receiver
        const receiver = chatData?.emails.filter(
          (email: string) => email !== currentUser?.email,
        )[0];

        // If no chat data, return
        if (!chatData) {
          return;
        }

        // Set Chat Data
        setChats({
          id: querySnapshot.id,
          receiver: receiver,
          ...chatData,
        });
      });

    return () => unsubscribe();
  }, []);

  // Update Read At
  useEffect(() => {
    if (currentUser) {
      UpdateReadAtService(id, currentUser);
    }
  }, [currentUser, id]);

  return (
    <View style={[styles.chatListBackground]}>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title={chats?.receiver ?? 'Unknown'} />
      </Appbar.Header>
      <FlatList
        style={[styles.chatListContainer]}
        data={chats?.messages}
        inverted
        renderItem={message => (
          <View
            style={[
              {width: screenWidth - 100},
              message.item.sender === currentUser?.email
                ? styles.chatListMessageMe
                : styles.chatListMessage,
            ]}>
            <Text
              style={[
                message.item.sender === currentUser?.email
                  ? styles.chatTextMe
                  : styles.chatText,
              ]}>
              {message.item.message ?? 'No messages'}
            </Text>
            <View style={[styles.alignRight]}>
              <Text
                style={[
                  message.item.sender === currentUser?.email
                    ? styles.chatDateMe
                    : styles.chatDate,
                ]}>
                {getDateFormat(message.item.createdAt)}
              </Text>
              {message.item.readAt &&
                message.item.sender === currentUser?.email && (
                  <Icon size={15} source="check" color={readIcon} />
                )}
            </View>
          </View>
        )}
      />
      <View style={[styles.inputMessageBaseLayer]}>
        <View style={[styles.inputMessageContainer]}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            name="message"
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                label="Message"
                mode="outlined"
                value={value}
                outlineStyle={inputOutline}
                theme={inputTheme}
                style={[styles.inputMessageStyle, {flexGrow: 1}]}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
          <TouchableOpacity
            onPress={handleSubmit(handleSendMessage)}
            style={[styles.sendMessage]}>
            <Icon size={30} source="send" color={colors.primary800} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
