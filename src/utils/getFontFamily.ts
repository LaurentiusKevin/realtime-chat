import {fontFamilies} from '../constants/fonts.ts';

/**
 * Get font family based on the font family and font weight
 * @param fontFamily
 * @param fontWeight
 */
export function getFontFamily(
  fontFamily: keyof typeof fontFamilies,
  fontWeight: keyof typeof fontFamilies.TitilliumWeb,
) {
  const selectedFontFamily = fontFamilies[fontFamily];

  return selectedFontFamily[fontWeight];
}
