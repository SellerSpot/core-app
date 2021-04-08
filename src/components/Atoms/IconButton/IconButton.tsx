import { IconButton as MUIIconButton, Theme, ThemeProvider } from '@material-ui/core';
import { getMUITheme } from 'components/ThemeProvider/MUIThemes';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { themeSelector } from 'store/models/theme';
import { IIconButtonProps } from './IconButton.types';

export default function IconButton(props: IIconButtonProps): ReactElement {
    // getting current theme state
    const themeState = useSelector(themeSelector);
    // holds the theme for the the component
    let buttonTheme: Theme = null;
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
            <MUIIconButton
                className={props.className}
                color={'primary'}
                size={props.size}
                type={props.type}
                disabled={props.disabled}
                onClick={props.onClick}
            >
                {props.icon}
            </MUIIconButton>
        </ThemeProvider>
    );
}
