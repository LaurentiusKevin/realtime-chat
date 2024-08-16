import {Text, View} from 'react-native';
import {color, stylesLight} from '../styles/style.ts';
import {Appbar, Button, TextInput} from 'react-native-paper';
import {Controller, useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import firestore from '@react-native-firebase/firestore';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';
import {PickReceiverProps} from '../types.ts';

const InputType = z.object({
  email: z
    .string({required_error: 'Email is required'})
    .email('Invalid email')
    .min(1, 'Email is required'),
});

/**
 * Pick Receiver Screen
 * Input receiver email to start chat
 * @param navigation
 * @constructor
 */
export default function PickReceiverScreen({navigation}: PickReceiverProps) {
  const [currentUser, setCurrentUser] = useState<FirebaseAuthTypes.User | null>(
    null,
  );

  // Get current user
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      setCurrentUser(user);
    });

    // Unsubscribe on unmount
    return () => subscriber();
  }, []);

  // Form Hook
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: zodResolver(InputType),
    defaultValues: {
      email: '',
    },
  });

  // Start Chat
  const handleStartChat = async (data: z.infer<typeof InputType>) => {
    // Check if chat already exists
    const chatRef = await firestore()
      .collection('chats')
      .where('emails', '==', [currentUser?.email, data.email])
      .get();

    // If chat already exists, navigate to chat screen
    if (chatRef.docs.length > 0) {
      navigation.navigate('Chat', {id: chatRef.docs[0].id});
    } else {
      const newChat = await firestore()
        .collection('chats')
        .add({
          emails: [currentUser?.email, data.email],
          createdAt: new Date(),
          readAt: new Date(),
          messages: [],
        });

      navigation.navigate('Chat', {id: newChat.id});
    }
  };

  return (
    <View style={stylesLight.baseLayer}>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title="Pick Receiver" />
      </Appbar.Header>
      <View style={[stylesLight.pickReceiverContainer]}>
        <View>
          <Text style={[stylesLight.formHeading]}>Input Receiver Email</Text>
        </View>

        <View>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            name="email"
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                label="Email"
                mode="outlined"
                value={value}
                textColor={color.primary}
                outlineColor={color.primaryBackground}
                outlineStyle={{
                  borderWidth: 2,
                  borderColor: color.primary,
                }}
                theme={{
                  colors: {
                    primary: color.primary,
                    onSurfaceVariant: color.primary,
                  },
                }}
                style={[stylesLight.loginInput]}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
          {errors.email && (
            <Text style={[stylesLight.formError]}>{errors.email.message}</Text>
          )}
        </View>

        <Button
          mode="contained"
          buttonColor={color.primaryButtonBackground}
          textColor={color.primary}
          style={[stylesLight.primaryButton, {marginVertical: 10}]}
          onPress={handleSubmit(handleStartChat)}>
          Start Chat
        </Button>
      </View>
    </View>
  );
}
