import React, { ReactElement } from 'react';
import lodash from 'lodash';
import styles from './button.module.css';

export interface IButtonProps {
    type?: 'button' | 'submit' | 'reset';
    label: string;
    style?: React.CSSProperties;
    onClick?: () => void;
}

const defaultProps: IButtonProps = {
    type: 'button',
    label: 'fuck',
    style: {},
    onClick: undefined,
};

export const Button = (props: IButtonProps): ReactElement => {
    const requiredProps = lodash.defaultsDeep(props, defaultProps);
    const { type, label, style, onClick } = requiredProps as IButtonProps;
    return (
        <button type={type} className={styles.button} style={style} onClick={onClick}>
            {label}
        </button>
    );
};
