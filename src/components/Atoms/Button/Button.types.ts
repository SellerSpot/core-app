import { ReactElement, MouseEvent } from 'react';

export interface IButtonProps {
    /**
     * Content to display inside the button
     */
    label?: string;
    type?: 'submit' | 'button' | 'reset';
    /**
     * Different styles of buttons
     */
    variant?: 'contained' | 'text' | 'outlined';
    size?: 'small' | 'medium' | 'large';
    /**
     * Different states such as success or danger or warning
     */
    state?: 'success' | 'danger' | 'warning' | 'default';
    disabled?: boolean;
    /** Icons before the label */
    startIcon?: ReactElement;
    /** Icons after the label */
    endIcon?: ReactElement;
    onClick?: (event: MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
