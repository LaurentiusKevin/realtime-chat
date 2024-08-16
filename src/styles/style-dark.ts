import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {getFontFamily} from '../utils/getFontFamily.ts';
import type {ThemeProp} from 'react-native-paper/lib/typescript/types';

const colorLight = {
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

export const colorDark = {
  primary: '#FFCB47',
  background: '#120e05',
  primary100: '#FFFEF2',
  primary200: '#FCF9E7',
  primary300: '#E4E0CA',
  primary400: '#8b8a87',
  primary500: '#716f6b',
  primary600: '#575550',
  primary700: '#3e3c37',
  primary800: '#272520',
  primary900: '#120e05',
};

export const inputOutlineDark: StyleProp<ViewStyle> = {
  borderWidth: 2,
  borderColor: colorDark.primary900,
};

export const inputThemeDark: ThemeProp = {
  colors: {
    primary: colorDark.primary900,
    onSurfaceVariant: colorDark.primary900,
  },
};

export const readIconDark = colorDark.primary100;

export const stylesDark = StyleSheet.create({
  baseLayer: {
    backgroundColor: colorDark.primary500,
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
    color: colorDark.primary900,
    fontFamily: getFontFamily('TitilliumWeb', 'Bold'),
    fontSize: 36,
    letterSpacing: 2,
  },
  loginSubheading: {
    color: colorDark.primary900,
    fontFamily: getFontFamily('TitilliumWeb', 'Bold'),
    fontSize: 34,
    letterSpacing: 2,
  },
  formHeading: {
    marginTop: 16,
    color: colorDark.primary900,
    fontFamily: getFontFamily('TitilliumWeb', 'Bold'),
    fontSize: 20,
    letterSpacing: 2,
  },
  loginInput: {
    backgroundColor: colorDark.primary500,
    color: colorDark.primary900,
  },
  heading: {
    color: colorDark.primary900,
    fontFamily: getFontFamily('TitilliumWeb', 'Regular'),
    fontSize: 25,
  },
  link: {
    color: colorDark.primary900,
    fontFamily: getFontFamily('TitilliumWeb', 'Regular'),
    fontSize: 18,
  },
  primaryButton: {
    backgroundColor: '#ffffff',
    fontFamily: getFontFamily('TitilliumWeb', 'Bold'),
    color: colorDark.primary900,
  },
  formError: {
    color: 'red',
    fontFamily: getFontFamily('TitilliumWeb', 'Regular'),
  },
  chatListBackground: {
    flex: 1,
    backgroundColor: colorDark.background,
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
    backgroundColor: colorDark.primary800,
    padding: 8,
    borderRadius: 10,
    marginVertical: 8,
  },
  chatListMessageMe: {
    flexDirection: 'column',
    backgroundColor: colorDark.primary400,
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
    color: colorDark.primary100,
    fontFamily: getFontFamily('TitilliumWeb', 'Bold'),
    fontSize: 16,
  },
  chatListDate: {
    color: colorDark.primary400,
    fontFamily: getFontFamily('TitilliumWeb', 'Regular'),
  },
  chatListPreviewMessage: {
    color: colorDark.primary200,
    fontFamily: getFontFamily('TitilliumWeb', 'Regular'),
    fontSize: 14,
  },
  chatListUnreadMessage: {
    color: colorDark.primary800,
    fontFamily: getFontFamily('TitilliumWeb', 'Bold'),
    fontSize: 14,
    backgroundColor: colorLight.primary500,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 25,
  },
  chatListActionButton: {
    backgroundColor: colorLight.primary500,
    padding: 12,
    borderRadius: 16,
    margin: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatListButtonText: {
    color: colorDark.primary800,
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
    color: colorDark.primary300,
    fontFamily: getFontFamily('TitilliumWeb', 'Regular'),
    fontSize: 18,
  },
  chatTextMe: {
    color: colorDark.primary800,
    fontFamily: getFontFamily('TitilliumWeb', 'Regular'),
    fontSize: 18,
  },
  alignRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 2,
  },
  chatDate: {
    color: colorDark.primary200,
    fontFamily: getFontFamily('TitilliumWeb', 'Regular'),
    fontSize: 12,
  },
  chatDateMe: {
    color: colorDark.primary900,
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
    backgroundColor: colorDark.primary400,
  },
  inputMessageStyle: {
    flexGrow: 1,
    backgroundColor: colorDark.primary400,
    color: colorDark.primary900,
  },
  sendMessage: {alignSelf: 'center', marginHorizontal: 8},
});
