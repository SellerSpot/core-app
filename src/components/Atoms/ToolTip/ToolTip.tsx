import { createMuiTheme, ThemeProvider, Tooltip, TooltipProps } from '@material-ui/core';
import { colorThemes, muiThemes } from 'config/themes';
import React, { ReactElement } from 'react';

export default function ToolTip(props: TooltipProps): ReactElement {
    const tooltipMUITheme = createMuiTheme(muiThemes.default, {
        overrides: {
            MuiTooltip: {
                tooltip: {
                    padding: '10px',
                    fontSize: '12px',
                    color: colorThemes.default.foregroundLight,
                    backgroundColor: colorThemes.default.dark,
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
