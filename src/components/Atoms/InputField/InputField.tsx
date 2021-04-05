import {
    CircularProgress,
    InputAdornment,
    TextField as MUITextField,
    ThemeProvider,
} from '@material-ui/core';
import cn from 'classnames';
import { muiThemes } from 'config/themes';
import { isNull } from 'lodash';
import React, { forwardRef, ReactElement, RefObject, useEffect, useRef } from 'react';
import styles from './InputField.module.scss';
import { IInputFieldProps } from './InputField.types';

function InputField(props: IInputFieldProps, ref: RefObject<HTMLInputElement>): ReactElement {
    const internalRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (props.autoFocus && isNull(ref)) {
            setTimeout(function () {
                internalRef.current?.focus();
            }, 100);
        }
    }, [props.autoFocus]);

    // choosing theme
    const textFieldTheme =
        props.state === 'error'
            ? muiThemes.danger
            : props.state === 'success'
            ? muiThemes.success
            : muiThemes.default;

    // holds the helperComponent for the textField

    let helperComponent: ReactElement = null;

    // compiling helperMessageComponent
    if (props.helperMessage?.enabled) {
        switch (props.helperMessage?.type) {
            case 'loading':
                helperComponent = (
                    <div className={styles.loadingHelperTextWrapper}>
                        <CircularProgress color={'primary'} size={'10px'} />
                        <p className={cn(styles.helperText, styles.loadingHelperContentText)}>
                            {props.helperMessage?.content}
                        </p>
                    </div>
                );
                break;
            default:
                helperComponent = (
                    <p
                        className={cn(
                            styles.helperText,
                            {
                                [styles.helperTextDanger]: props.helperMessage?.type === 'error',
                            },
                            {
                                [styles.helperTextSuccess]: props.helperMessage?.type === 'success',
                            },
                            {
                                [styles.helperTextWarning]: props.helperMessage?.type === 'warning',
                            },
                        )}
                    >
                        {props.helperMessage?.content}
                    </p>
                );
                break;
        }
    }

    return (
        <div className={cn({ [styles.inputFieldBottomSpace]: !props.helperMessage?.enabled })}>
            <ThemeProvider theme={textFieldTheme}>
                <MUITextField
                    inputRef={ref ?? internalRef}
                    variant={'outlined'}
                    onChange={props.onChange}
                    value={props.value}
                    label={props.label}
                    type={props.type}
                    placeholder={props.placeHolder}
                    autoFocus={props.autoFocus}
                    required={props.required}
                    disabled={props.disabled}
                    FormHelperTextProps={{
                        className: cn({
                            [styles.helperTextSuccess]: props.state === 'success',
                            [styles.helperTextDanger]: props.state === 'error',
                        }),
                    }}
                    inputProps={{
                        style: {
                            textAlign: props.direction === 'rtl' ? 'right' : 'left',
                            fontWeight: 500,
                        },
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position={'start'}>{props.prefix}</InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position={'end'}>{props.suffix}</InputAdornment>
                        ),
                    }}
                    error={props.state === 'error'}
                    helperText={helperComponent}
                />
            </ThemeProvider>
        </div>
    );
}

export default forwardRef(InputField);
