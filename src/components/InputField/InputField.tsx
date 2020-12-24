import React, { ReactElement } from 'react';
import styles from './inputfield.module.css';
import lodash from 'lodash';

export interface IInputFieldProps {
    type: 'text' | 'password' | 'email';
    label: string;
    labelStyle?: React.CSSProperties;
    inputStyle?: React.CSSProperties;
}

const defaultProps: IInputFieldProps = {
    type: 'text',
    label: '',
    labelStyle: {},
    inputStyle: {},
};

export const InputField = (props: IInputFieldProps): ReactElement => {
    const requiredProps = lodash.defaultsDeep(props, defaultProps);
    const { label, type, inputStyle, labelStyle } = requiredProps;
    return (
        <div className={styles.inputFieldWrapper}>
            <label className={styles.inputFieldLabel} style={inputStyle}>
                {label}
            </label>
            <input className={styles.inputField} type={type} style={labelStyle} />
        </div>
    );
};
