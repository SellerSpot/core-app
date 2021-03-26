import { IThemeColors } from 'config/themes';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { themeSelector } from 'store/models/theme';

export default function ThemeSetter(): JSX.Element {
    const theme = useSelector(themeSelector);

    // applying the theme from store to dom
    useEffect(() => {
        Object.keys(theme.colors).forEach((key) => {
            document.documentElement.style.setProperty(
                `--${key}-color`,
                theme.colors[key as keyof IThemeColors],
            );
        });
    }, [theme]);

    return <></>;
}
