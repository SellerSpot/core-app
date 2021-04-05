import { Chip as MUIChip, Theme, ThemeProvider } from '@material-ui/core';
import { muiThemes } from 'config/themes';
import React, { ReactElement } from 'react';
import styles from './Chip.module.scss';
import { IChipProps } from './Chip.types';

export default function Chip(props: IChipProps): ReactElement {
    // holds the theme for the the component
    let chipTheme: Theme = null;
    // deciding the theme to apply to the chip
    switch (props.state) {
        case 'success':
            chipTheme = muiThemes.success;
            break;
        case 'danger':
            chipTheme = muiThemes.danger;
            break;
        case 'warning':
            chipTheme = muiThemes.warning;
            break;
        case 'accent':
            chipTheme = muiThemes.accent;
            break;
        default:
            chipTheme = muiThemes.default;
    }
    return (
        <ThemeProvider theme={chipTheme}>
            <MUIChip
                className={styles.chip}
                icon={props.leadingIcon}
                variant={'default'}
                size={'small'}
                label={props.label}
                color={'primary'}
            />
        </ThemeProvider>
    );
}
