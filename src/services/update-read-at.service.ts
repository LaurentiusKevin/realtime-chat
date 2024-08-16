import firestore from '@react-native-firebase/firestore';
import {Chat} from '../types.ts';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

/**
 * Update the readAt field of the messages
 * @param id
 * @param currentUser
 * @constructor
 */
export default async function UpdateReadAtService(
  id: string,
  currentUser: FirebaseAuthTypes.User,
) {
  // Get the chat
  const chatRef = firestore().collection('chats').doc(id);

  // Get the chat document
  const chatDoc = await chatRef.get();

  // If the chat does not exist, return
  if (!chatDoc.exists) {
    return;
  }

  // Get the chat data
  const chat = chatDoc.data() as Chat;

  // Update the readAt field of the messages
  const messages = chat.messages.map(message => {
    if (message.sender !== currentUser.email) {
      return {
        ...message,
        readAt: new Date(),
      };
    }

    return message;
  });

  // Update the chat
  await chatRef.update({
    messages: messages,
  });
}
