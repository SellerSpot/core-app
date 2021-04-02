import { Tooltip, withStyles } from '@material-ui/core';
import { colorThemes } from 'config/themes';
import React, { ReactElement } from 'react';
import { IToolTipProps } from './ToolTip.types';

export default function ToolTip(props: IToolTipProps): ReactElement {
    const CustomToolTip = withStyles({
        tooltip: {
            padding: '10px',
            fontSize: '12px',
            fontFamily: 'Inter',
            color: colorThemes.default.foregroundLight,
            backgroundColor: colorThemes.default.dark,
            fontWeight: 500,
        },
    })(Tooltip);

    return (
        <CustomToolTip title={props.message} placement={props.placement}>
            {props.children}
        </CustomToolTip>
    );
}
