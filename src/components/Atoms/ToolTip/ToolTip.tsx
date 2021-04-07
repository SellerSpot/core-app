import { createMuiTheme, ThemeProvider, Tooltip, TooltipProps } from '@material-ui/core';
import { getMUITheme } from 'components/ThemeProvider/MUIThemes';
import { colorThemes } from 'config/themes';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { themeSelector } from 'store/models/theme';

export default function ToolTip(props: TooltipProps): ReactElement {
    // getting current theme state
    const themeState = useSelector(themeSelector);
    // compiling the theme for the tooltip
    const tooltipMUITheme = createMuiTheme(getMUITheme('primary', themeState.colorTheme), {
        overrides: {
            MuiTooltip: {
                tooltip: {
                    padding: '10px',
                    fontSize: '12px',
                    color: colorThemes[themeState.colorTheme].foregroundLight,
                    backgroundColor: colorThemes[themeState.colorTheme].dark,
                    fontWeight: 500,
                },
            },
        },
    });

    return (
        <ThemeProvider theme={tooltipMUITheme}>
            <Tooltip {...props}>{props.children}</Tooltip>
        </ThemeProvider>
    );
}
