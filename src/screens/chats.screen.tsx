import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Chat, ChatsProps} from '../types.ts';
import {Appbar} from 'react-native-paper';
import {useCallback, useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useThemeStyles} from '../hooks/useThemeStyle.ts';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useFocusEffect} from '@react-navigation/native';

/**
 * Chats Screen
 * Display all chats
 * @param navigation
 * @constructor
 */
export default function ChatsScreen({navigation}: ChatsProps) {
  const {styles} = useThemeStyles();
  const [currentUser, setCurrentUser] = useState<FirebaseAuthTypes.User | null>(
    null,
  );
  const [chats, setChats] = useState<any[]>([]);

  // Sign out
  const handleSignOut = async () => {
    await auth().signOut();
    navigation.navigate('Login');
  };

  // Get current user
  useEffect(() => {
    const unsubscribeAuth = auth().onAuthStateChanged(user => {
      setCurrentUser(user);
    });

    return () => unsubscribeAuth(); // Clean up the subscription on unmount
  }, []);

  // Get chats
  useFocusEffect(
    useCallback(() => {
      if (currentUser) {
        const unsubscribe = firestore()
          .collection('chats')
          .orderBy('createdAt', 'asc')
          .where('emails', 'array-contains', currentUser?.email)
          .onSnapshot(querySnapshot => {
            if (querySnapshot) {
              const chatList = querySnapshot.docs.map(doc => {
                const chatData = doc.data() as Chat;
                const messages = chatData.messages;

                const sortedMessages = messages.sort((a, b) => {
                  return (
                    (b.createdAt?.toMillis() ?? 0) -
                    (a.createdAt?.toMillis() ?? 0)
                  );
                });

                const unreadMessage = messages.filter(
                  message =>
                    message.readAt === undefined &&
                    message.sender !== currentUser.email,
                );

                const receiver = chatData.emails.filter(
                  email => email !== currentUser.email,
                );

                return {
                  id: doc.id,
                  ...chatData,
                  receiver: receiver,
                  latestMessage: sortedMessages[0],
                  unreadMessage: unreadMessage.length,
                };
              });

              setChats(chatList);
            }
          });

        return () => unsubscribe();
      }
    }, [currentUser]),
  );

  return (
    <View style={[styles.chatListBackground]}>
      <Appbar.Header>
        <Appbar.Content title="Chats" />
        <Appbar.Action icon="logout" onPress={() => handleSignOut()} />
      </Appbar.Header>
      <ScrollView style={[styles.chatListContainer]}>
        {chats.map(chat => (
          <TouchableOpacity
            key={chat.id}
            style={[styles.chatListMessage]}
            onPress={() => navigation.navigate('Chat', {id: chat.id})}>
            <View style={[styles.chatListHeader]}>
              <Text style={[styles.chatListEmail]}>{chat.receiver}</Text>
              <Text style={[styles.chatListDate]}>
                {chat.createdAt.toDate().toDateString()}
              </Text>
            </View>
            <View style={[styles.chatListHeader]}>
              <Text style={[styles.chatListPreviewMessage]}>
                {chat.latestMessage?.message ?? 'No messages'}
              </Text>
              {chat.unreadMessage > 0 && (
                <Text style={[styles.chatListUnreadMessage]}>
                  {chat.unreadMessage}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.chatListActionButton}
        onPress={() => {
          navigation.navigate('PickReceiver');
        }}>
        <Text style={styles.chatListButtonText}>New Message</Text>
      </TouchableOpacity>
    </View>
  );
}
