import React, { ReactElement } from 'react';
import { MenuItem, TextField as MUITextField } from '@material-ui/core';
import { ISelectProps } from './Select.types';

export default function Select(props: ISelectProps): ReactElement {
    return (
        <MUITextField
            variant="outlined"
            select
            size={props.size}
            value={props.value}
            label={props.label}
            onChange={props.onChange}
        >
            {props.options.map((option, index) => {
                return (
                    <MenuItem key={index} value={option.value}>
                        {option.text}
                    </MenuItem>
                );
            })}
        </MUITextField>
    );
}
