import { Button as MUIButton, Theme, ThemeProvider } from '@material-ui/core';
import { getMUITheme } from 'components/ThemeProvider/MUIThemes';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { themeSelector } from 'store/models/theme';
import { IButtonProps } from './Button.types';

export default function Button(props: IButtonProps): ReactElement {
    // getting current theme state
    const themeState = useSelector(themeSelector);
    // holds the theme for the the component
    let buttonTheme: Theme;
    // deciding the theme to apply to the button
    switch (props.state) {
        case 'success':
            buttonTheme = getMUITheme('success', themeState.colorTheme);
            break;
        case 'danger':
            buttonTheme = getMUITheme('danger', themeState.colorTheme);
            break;
        case 'warning':
            buttonTheme = getMUITheme('warning', themeState.colorTheme);
            break;
        case 'accent':
            buttonTheme = getMUITheme('accent', themeState.colorTheme);
            break;
        case 'primary':
            buttonTheme = getMUITheme('primary', themeState.colorTheme);
        case 'grey':
            buttonTheme = getMUITheme('grey', themeState.colorTheme);
    }
    return (
        <ThemeProvider theme={buttonTheme}>
            <MUIButton
                variant={props.variant}
                color={'primary'}
                size={props.size}
                type={props.type}
                disabled={props.disabled}
                onClick={props.onClick}
                startIcon={props.startIcon}
                endIcon={props.endIcon}
            >
                {props.label}
            </MUIButton>
        </ThemeProvider>
    );
}
