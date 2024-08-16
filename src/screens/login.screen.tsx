import {Text, TouchableOpacity, View} from 'react-native';
import {color, stylesLight} from '../styles/style.ts';
import {Button, TextInput} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import {Controller, useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useState} from 'react';
import {generateFcmToken} from '../services/fcm-token.service.ts';
import {LoginProps} from '../types.ts';

const InputType = z.object({
  email: z
    .string({required_error: 'Username is required'})
    .email('Invalid email')
    .min(1, 'Username is required'),
  password: z
    .string({required_error: 'Password is required'})
    .min(1, 'Password is required'),
});

/**
 * Login Screen
 * @param navigation
 * @constructor
 */
export default function LoginScreen({navigation}: LoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form Hook
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: zodResolver(InputType),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Handle Login
  const handleLogin = (data: z.infer<typeof InputType>) => {
    setIsLoading(true);
    auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then(async () => {
        await generateFcmToken();
        setIsLoading(false);
        navigation.replace('Chats');
      })
      .catch(error => {
        setIsLoading(false);
        console.error(error);
      });
  };

  return (
    <View style={stylesLight.baseLayer}>
      <View style={[stylesLight.container, stylesLight.loginScreen]}>
        <View>
          <Text style={[stylesLight.loginHeading]}>Tech Assessment</Text>
          <Text style={[stylesLight.loginSubheading]}>Realtime Chat APP</Text>
          <Text style={[stylesLight.formHeading]}>Login</Text>
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

        <View>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            name="password"
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                label="Password"
                mode="outlined"
                secureTextEntry={!showPassword}
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
          {errors.password && (
            <Text style={[stylesLight.formError]}>
              {errors.password.message}
            </Text>
          )}
        </View>

        <View style={[{justifyContent: 'center'}]}>
          <Button
            mode="text"
            textColor={color.primary}
            style={[{alignSelf: 'flex-end'}]}
            onPress={() => setShowPassword(!showPassword)}>
            {!showPassword ? 'Show' : 'Hide '} Password
          </Button>
        </View>

        <Button
          mode="contained"
          loading={isLoading}
          disabled={isLoading}
          buttonColor={color.primaryButtonBackground}
          textColor={color.primary}
          style={[stylesLight.primaryButton, {marginVertical: 10}]}
          onPress={handleSubmit(handleLogin)}>
          Login
        </Button>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={[stylesLight.link]}>Doesn't have account?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
