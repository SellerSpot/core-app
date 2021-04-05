import { IconButton as MUIIconButton, Theme, ThemeProvider } from '@material-ui/core';
import { muiThemes } from 'config/themes';
import React, { ReactElement } from 'react';
import { IIconButtonProps } from './IconButton.types';

export default function IconButton(props: IIconButtonProps): ReactElement {
    // holds the theme for the the component
    let buttonTheme: Theme = null;
    // deciding the theme to apply to the button
    switch (props.state) {
        case 'success':
            buttonTheme = muiThemes.success;
            break;
        case 'danger':
            buttonTheme = muiThemes.danger;
            break;
        case 'warning':
            buttonTheme = muiThemes.warning;
            break;
        default:
            buttonTheme = muiThemes.default;
    }
    return (
        <ThemeProvider theme={buttonTheme}>
            <MUIIconButton
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
