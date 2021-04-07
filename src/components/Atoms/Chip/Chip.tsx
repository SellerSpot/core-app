import { Chip as MUIChip, Theme, ThemeProvider } from '@material-ui/core';
import cn from 'classnames';
import { getMUITheme } from 'components/ThemeProvider/MUIThemes';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { themeSelector } from 'store/models/theme';
import styles from './Chip.module.scss';
import { IChipProps } from './Chip.types';

export default function Chip(props: IChipProps): ReactElement {
    // getting current theme state
    const themeState = useSelector(themeSelector);
    // holds the theme for the the component
    let chipTheme: Theme;
    // deciding the theme to apply to the chip
    switch (props.state) {
        case 'success':
            chipTheme = getMUITheme('success', themeState.colorTheme);
            break;
        case 'danger':
            chipTheme = getMUITheme('danger', themeState.colorTheme);
            break;
        case 'warning':
            chipTheme = getMUITheme('warning', themeState.colorTheme);
            break;
        case 'accent':
            chipTheme = getMUITheme('accent', themeState.colorTheme);
            break;
        case 'primary':
            chipTheme = getMUITheme('primary', themeState.colorTheme);
        case 'grey':
            chipTheme = getMUITheme('grey', themeState.colorTheme);
    }
    return (
        <ThemeProvider theme={chipTheme}>
            <MUIChip
                className={cn(styles.chip, props.className)}
                icon={props.leadingIcon}
                variant={'default'}
                size={'small'}
                label={props.label}
                color={'primary'}
            />
        </ThemeProvider>
    );
}
