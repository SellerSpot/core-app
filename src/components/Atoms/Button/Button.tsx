import { Button as MUIButton, ThemeProvider } from '@material-ui/core';
import { successMUITheme } from 'config/themes';
import React, { ReactElement } from 'react';
import { IButtonProps } from './Button.types';

export default function Button(props: IButtonProps): ReactElement {
    return (
        <ThemeProvider theme={successMUITheme}>
            <MUIButton onClick={props.onClick}>{props.label}</MUIButton>
        </ThemeProvider>
    );
}
