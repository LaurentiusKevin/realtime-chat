import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {getFontFamily} from '../utils/getFontFamily.ts';
import type {ThemeProp} from 'react-native-paper/lib/typescript/types';
import {colorDark} from './style-dark.ts';

export const color = {
  primary: '#151306',
  secondary: '#474747',
  primaryBackground: '#fcc949',
  secondaryBackground: '#fff5bb',
  primaryInputBackground: '#cfa53d',
  primaryButtonBackground: '#ffffff',
};

export const colorLight = {
  primary: '#FFCB47',
  background: '#efefea',
  primary100: '#FFFEF2',
  primary200: '#FFF9C8',
  primary300: '#FFEF9D',
  primary400: '#FFDF72',
  primary500: '#FFCB47',
  primary600: '#C98F21',
  primary700: '#935E0F',
  primary800: '#5C3608',
  primary900: '#261403',
};

export const inputOutlineLight: StyleProp<ViewStyle> = {
  borderWidth: 2,
  borderColor: colorLight.primary900,
};

export const inputThemeLight: ThemeProp = {
  colors: {
    primary: colorLight.primary900,
    onSurfaceVariant: colorLight.primary900,
  },
};

export const readIconLight = colorDark.primary800;

export const stylesLight = StyleSheet.create({
  baseLayer: {
    backgroundColor: colorLight.primary500,
    height: '100%',
  },
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 16,
    gap: 6,
  },
  loginScreen: {
    paddingTop: 26,
  },
  loginHeading: {
    color: colorLight.primary900,
    fontFamily: getFontFamily('TitilliumWeb', 'Bold'),
    fontSize: 36,
    letterSpacing: 2,
  },
  loginSubheading: {
    color: colorLight.primary900,
    fontFamily: getFontFamily('TitilliumWeb', 'Bold'),
    fontSize: 34,
    letterSpacing: 2,
  },
  formHeading: {
    marginTop: 16,
    color: colorLight.primary900,
    fontFamily: getFontFamily('TitilliumWeb', 'Bold'),
    fontSize: 20,
    letterSpacing: 2,
  },
  loginInput: {
    backgroundColor: colorLight.primary500,
    color: colorLight.primary900,
  },
  heading: {
    color: colorLight.primary900,
    fontFamily: getFontFamily('TitilliumWeb', 'Regular'),
    fontSize: 25,
  },
  link: {
    color: colorLight.primary900,
    fontFamily: getFontFamily('TitilliumWeb', 'Regular'),
    fontSize: 18,
  },
  primaryButton: {
    backgroundColor: '#ffffff',
    fontFamily: getFontFamily('TitilliumWeb', 'Bold'),
    color: colorLight.primary900,
  },
  formError: {
    color: 'red',
    fontFamily: getFontFamily('TitilliumWeb', 'Regular'),
  },
  chatListBackground: {
    flex: 1,
    backgroundColor: colorLight.background,
  },
  chatListContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: 18,
    marginHorizontal: 16,
    marginTop: 16,
  },
  chatListMessage: {
    flexDirection: 'column',
    backgroundColor: colorLight.primary100,
    padding: 8,
    borderRadius: 10,
    marginVertical: 8,
  },
  chatListMessageMe: {
    flexDirection: 'column',
    backgroundColor: colorLight.primary200,
    alignSelf: 'flex-end',
    padding: 8,
    borderRadius: 10,
    marginVertical: 8,
  },
  chatListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chatListEmail: {
    color: colorLight.primary600,
    fontFamily: getFontFamily('TitilliumWeb', 'Bold'),
    fontSize: 16,
  },
  chatListDate: {
    color: colorLight.primary700,
    fontFamily: getFontFamily('TitilliumWeb', 'Regular'),
  },
  chatListPreviewMessage: {
    color: colorLight.primary800,
    fontFamily: getFontFamily('TitilliumWeb', 'Regular'),
    fontSize: 14,
  },
  chatListUnreadMessage: {
    color: colorLight.primary800,
    fontFamily: getFontFamily('TitilliumWeb', 'Bold'),
    fontSize: 14,
    backgroundColor: colorLight.primary400,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 25,
  },
  chatListActionButton: {
    backgroundColor: colorLight.primary400,
    padding: 12,
    borderRadius: 16,
    margin: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatListButtonText: {
    color: colorLight.primary800,
    fontFamily: getFontFamily('TitilliumWeb', 'Bold'),
    fontSize: 18,
  },
  pickReceiverContainer: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 8,
    gap: 6,
  },
  chatText: {
    color: colorLight.primary800,
    fontFamily: getFontFamily('TitilliumWeb', 'Regular'),
    fontSize: 18,
  },
  chatTextMe: {
    color: colorLight.primary900,
    fontFamily: getFontFamily('TitilliumWeb', 'Regular'),
    fontSize: 18,
  },
  alignRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  chatDate: {
    color: colorLight.primary800,
    fontFamily: getFontFamily('TitilliumWeb', 'Regular'),
    fontSize: 12,
  },
  chatDateMe: {
    color: colorDark.primary800,
    fontFamily: getFontFamily('TitilliumWeb', 'Regular'),
    fontSize: 12,
  },
  inputMessageContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 8,
    gap: 6,
  },
  inputMessageBaseLayer: {
    backgroundColor: colorLight.primary200,
  },
  inputMessageStyle: {
    flexGrow: 1,
    backgroundColor: colorLight.primary200,
    color: colorLight.primary900,
  },
  sendMessage: {alignSelf: 'center', marginHorizontal: 8},
});
