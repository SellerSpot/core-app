import { colorThemes, fontSizeThemes, IColors, IFontSizes } from '@sellerspot/universal-components';
import { useSelector } from 'react-redux';
import { themeSelector } from '../store/models/theme';

interface IUseThemeResponse {
    colors: IColors;
    fontSizes: IFontSizes;
}

export const useTheme = (): IUseThemeResponse => {
    const { colorTheme, fontSizeTheme } = useSelector(themeSelector);

    // compute
    const colors = colorThemes[colorTheme];
    const fontSizes = fontSizeThemes[fontSizeTheme];

    return { colors, fontSizes };
};
