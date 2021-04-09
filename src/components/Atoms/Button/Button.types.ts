import { ReactElement } from 'react';

export interface IButtonProps {
    /**
     * Content to display inside the button
     */
    label?: string | ReactElement;
    type?: 'submit' | 'button' | 'reset';
    fullWidth?: boolean;
    /**
     * Different styles of buttons
     */
    variant?: 'contained' | 'text' | 'outlined';
    size?: 'small' | 'medium' | 'large';
    /**
     * Different states such as success or danger or warning
     */
    state?: 'success' | 'danger' | 'warning' | 'primary' | 'accent' | 'grey';
    disabled?: boolean;
    /** Icons before the label */
    startIcon?: ReactElement;
    /** Icons after the label */
    endIcon?: ReactElement;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
