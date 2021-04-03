import {
    CircularProgress,
    createMuiTheme,
    InputAdornment,
    TextField as MUITextField,
    ThemeProvider,
} from '@material-ui/core';
import cn from 'classnames';
import { colorThemes, muiThemes } from 'config/themes';
import React, { forwardRef, ReactElement, ReactNode, RefObject } from 'react';
import styles from './InputField.module.scss';
import { IInputFieldProps } from './InputField.types';

// success field theme
const successMUITheme = createMuiTheme(muiThemes.default, {
    palette: {
        primary: {
            main: colorThemes.default.success,
        },
        secondary: {
            main: colorThemes.default.successLight,
        },
    },
});

// success field theme
const dangerMUITheme = createMuiTheme(muiThemes.default, {
    palette: {
        primary: {
            main: colorThemes.default.danger,
        },
        secondary: {
            main: colorThemes.default.dangerLight,
        },
    },
});

// eslint-disable-next-line react/display-name
const InputField = forwardRef(
    (
        props: IInputFieldProps,
        ref: RefObject<{
            inputRef: RefObject<HTMLInputElement>;
            wrapperRef: RefObject<HTMLDivElement>;
        }>,
    ): ReactElement => {
        const requiredProps = props;

        // choosing theme
        const textFieldTheme =
            requiredProps.state === 'error'
                ? dangerMUITheme
                : requiredProps.state === 'success'
                ? successMUITheme
                : muiThemes.default;

        // holds the helperComponent for the textField

        let helperComponent: ReactNode = null;

        // compiling helperMessageComponent
        if (requiredProps.helperMessage?.enabled) {
            switch (requiredProps.helperMessage?.type) {
                case 'loading':
                    helperComponent = (
                        <div className={styles.loadingHelperTextWrapper}>
                            <CircularProgress color={'primary'} size={'10px'} />
                            <p className={cn(styles.helperText, styles.loadingHelperContentText)}>
                                {requiredProps.helperMessage?.content}
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
                                    [styles.helperTextDanger]:
                                        requiredProps.helperMessage?.type === 'error',
                                },
                                {
                                    [styles.helperTextSuccess]:
                                        requiredProps.helperMessage?.type === 'success',
                                },
                                {
                                    [styles.helperTextWarning]:
                                        requiredProps.helperMessage?.type === 'warning',
                                },
                            )}
                        >
                            {requiredProps.helperMessage?.content}
                        </p>
                    );
                    break;
            }
        }

        return (
            <div
                ref={ref.current?.wrapperRef}
                className={cn({ [styles.inputFieldBottomSpace]: !props.helperMessage?.enabled })}
            >
                <ThemeProvider theme={textFieldTheme}>
                    {/* <input ref={props.ref} type="text" placeholder={'Sample Placehodler'} /> */}
                    <MUITextField
                        inputRef={ref.current.inputRef}
                        variant={'outlined'}
                        onChange={requiredProps.onChange}
                        value={requiredProps.value}
                        label={requiredProps.label}
                        type={requiredProps.type}
                        placeholder={requiredProps.placeHolder}
                        autoFocus={requiredProps.autoFocus}
                        required={requiredProps.required}
                        disabled={requiredProps.disabled}
                        FormHelperTextProps={{
                            className: cn({
                                [styles.helperTextSuccess]: requiredProps.state === 'success',
                                [styles.helperTextDanger]: requiredProps.state === 'error',
                            }),
                        }}
                        inputProps={{
                            style: {
                                textAlign: requiredProps.direction === 'rtl' ? 'right' : 'left',
                                fontWeight: 600,
                            },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position={'start'}>
                                    {requiredProps.prefix}
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position={'end'}>
                                    {requiredProps.suffix}
                                </InputAdornment>
                            ),
                        }}
                        error={requiredProps.state === 'error'}
                        helperText={helperComponent}
                    />
                </ThemeProvider>
            </div>
        );
    },
);

export default InputField;
