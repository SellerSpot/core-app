import React, { ReactElement } from 'react';
import styles from './inputfield.module.css';
import lodash from 'lodash';

export interface IInputFieldProps {
    type: 'text' | 'password' | 'email';
    label: string;
    labelStyle?: React.CSSProperties;
    inputStyle?: React.CSSProperties;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const defaultProps: IInputFieldProps = {
    type: 'text',
    label: '',
    labelStyle: {},
    inputStyle: {},
    onChange: undefined,
};

export const InputField = (props: IInputFieldProps): ReactElement => {
    const requiredProps = lodash.defaultsDeep(props, defaultProps);
    const { label, type, inputStyle, labelStyle, onChange } = requiredProps;
    return (
        <div className={styles.inputFieldWrapper}>
            <label className={styles.inputFieldLabel} style={inputStyle}>
                {label}
            </label>
            <input
                className={styles.inputField}
                type={type}
                style={labelStyle}
                onChange={onChange}
            />
        </div>
    );
};
