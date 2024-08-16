import {Text, TouchableOpacity, View} from 'react-native';
import {color, stylesLight} from '../styles/style.ts';
import {Button, TextInput} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import {Controller, useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useState} from 'react';
import {SignUpProps} from '../types.ts';

const InputType = z
  .object({
    email: z
      .string({required_error: 'Username is required'})
      .email('Invalid email')
      .min(1, 'Username is required'),
    password: z
      .string({required_error: 'Password is required'})
      .min(1, 'Password is required'),
    passwordConfirmation: z
      .string({required_error: 'Password is required'})
      .min(1, 'Password is required'),
  })
  .refine(data => data.password === data.passwordConfirmation, {
    path: ['passwordConfirmation'],
    message: 'Passwords must match',
  });

/**
 * Sign Up Screen
 * @param navigation
 * @constructor
 */
export default function LoginScreen({navigation}: SignUpProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

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
      passwordConfirmation: '',
    },
  });

  // Handle Sign Up
  const handleSignUp = (data: z.infer<typeof InputType>) => {
    auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(() => {
        navigation.replace('Login');
      })
      .catch(error => {
        setFormError(error.message);
        console.error(error);
      });
  };

  return (
    <View style={stylesLight.baseLayer}>
      <View style={[stylesLight.container, stylesLight.loginScreen]}>
        <View>
          <Text style={[stylesLight.loginHeading]}>Tech Assessment</Text>
          <Text style={[stylesLight.loginSubheading]}>Realtime Chat APP</Text>
          <Text style={[stylesLight.formHeading]}>Sign Up</Text>
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
                value={value}
                secureTextEntry={!showPassword}
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

        <View>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            name="passwordConfirmation"
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                label="Password Confirmation"
                mode="outlined"
                value={value}
                secureTextEntry={!showPassword}
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
          {errors.passwordConfirmation && (
            <Text style={[stylesLight.formError]}>
              {errors.passwordConfirmation.message}
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
          buttonColor={color.primaryButtonBackground}
          textColor={color.primary}
          style={[stylesLight.primaryButton, {marginVertical: 10}]}
          onPress={handleSubmit(handleSignUp)}>
          Sign Up
        </Button>
        {formError && <Text style={[stylesLight.formError]}>{formError}</Text>}

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={[stylesLight.link]}>Already have account?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
