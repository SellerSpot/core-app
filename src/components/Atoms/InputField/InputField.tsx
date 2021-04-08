import {
    CircularProgress,
    InputAdornment,
    TextField as MUITextField,
    ThemeProvider,
} from '@material-ui/core';
import cn from 'classnames';
import { getMUITheme } from 'components/ThemeProvider/MUIThemes';
import { isNull, isUndefined } from 'lodash';
import React, { forwardRef, ReactElement, RefObject, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { themeSelector } from 'store/models/theme';
import styles from './InputField.module.scss';
import { IInputFieldProps } from './InputField.types';

const InputField = (props: IInputFieldProps, ref: RefObject<HTMLInputElement>): ReactElement => {
    // getting current theme state
    const themeState = useSelector(themeSelector);
    // internal ref object to manage autoFocus prop enforcing in case
    // and external ref is not provided
    const internalRef = useRef<HTMLInputElement>(null);
    // runs when autoFocus value changes to force focus to field
    useEffect(() => {
        // also only runs when an external ref has not been provided
        if (props.autoFocus && isNull(ref)) {
            // wait till other animations have been completed
            // so as to not create jank effects
            setTimeout(function () {
                internalRef.current?.focus();
            }, 100);
        }
    }, [props.autoFocus]);

    // choosing theme
    const textFieldTheme =
        props.state === 'error'
            ? getMUITheme('danger', themeState.colorTheme)
            : props.state === 'success'
            ? getMUITheme('success', themeState.colorTheme)
            : getMUITheme('primary', themeState.colorTheme);

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
                    onBlur={props.onBlur}
                    onFocus={(event) => {
                        if (props.selectTextOnClick) {
                            event.target.select();
                        }
                        if (!isUndefined(props.onFocus)) {
                            props.onFocus(event);
                        }
                    }}
                    value={props.value}
                    label={props.label}
                    type={props.type}
                    size={props.size}
                    fullWidth={props.fullWidth}
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
                        max: props.maxNumericValue,
                        min: props.minNumericValue,
                        maxLength: props.maxLength,
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
};

export default forwardRef(InputField) as typeof InputField;
