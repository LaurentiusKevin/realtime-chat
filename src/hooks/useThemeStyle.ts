import {useColorScheme} from 'react-native';
import {
  colorLight,
  inputOutlineLight,
  inputThemeLight,
  readIconLight,
  stylesLight,
} from '../styles/style.ts';
import {
  colorDark,
  inputOutlineDark,
  inputThemeDark,
  readIconDark,
  stylesDark,
} from '../styles/style-dark.ts';

/**
 * Custom hook to get the theme styles
 * based on the color scheme
 */
export const useThemeStyles = () => {
  // Get the color scheme
  const colorScheme = useColorScheme();

  // Check if the color scheme is dark
  const isDark = colorScheme === 'dark';

  // Get the styles based on the color scheme
  const colors = isDark ? colorDark : colorLight;
  const styles = isDark ? stylesDark : stylesLight;
  const inputOutline = isDark ? inputOutlineDark : inputOutlineLight;
  const inputTheme = isDark ? inputThemeDark : inputThemeLight;
  const readIcon = isDark ? readIconDark : readIconLight;

  // Return the styles
  return {colors, styles, inputOutline, inputTheme, readIcon};
};
