import { Alert as MUIAlert, AlertTitle } from '@material-ui/lab';
import { isUndefined } from 'lodash';
import React, { ReactElement } from 'react';
import { IAlertProps } from './Alert.types';

export default function Alert(props: IAlertProps): ReactElement {
    return (
        <MUIAlert severity={props.type}>
            {!isUndefined(props.title) ? <AlertTitle>{props.title}</AlertTitle> : null}
            <h5>Sample Text</h5>
            {props.children}
        </MUIAlert>
    );
}
