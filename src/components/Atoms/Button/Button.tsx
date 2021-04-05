import { Button as MUIButton, Theme, ThemeProvider } from '@material-ui/core';
import { muiThemes } from 'config/themes';
import React, { ReactElement } from 'react';
import { IButtonProps } from './Button.types';

export default function Button(props: IButtonProps): ReactElement {
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
