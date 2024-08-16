import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Chats: undefined;
  Chat: {id: string};
  PickReceiver: undefined;
};

export type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

export type SignUpProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

export type ChatsProps = NativeStackScreenProps<RootStackParamList, 'Chats'>;

export type ChatProps = NativeStackScreenProps<RootStackParamList, 'Chat'>;

export type PickReceiverProps = NativeStackScreenProps<
  RootStackParamList,
  'PickReceiver'
>;

export type Message = {
  createdAt: FirebaseFirestoreTypes.Timestamp;
  readAt?: FirebaseFirestoreTypes.Timestamp;
  sender: string;
  message: string;
};

export type Chat = {
  id?: string;
  receiver?: string;
  emails: string[];
  createdAt: FirebaseFirestoreTypes.Timestamp;
  readAt?: FirebaseFirestoreTypes.Timestamp;
  messages: Message[];
};
