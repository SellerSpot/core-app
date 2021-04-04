import { ReactElement, MouseEvent } from 'react';

export interface IIconButtonProps {
    /**
     * Content to display inside the button
     */
    children?: ReactElement;
    type?: 'submit' | 'button' | 'reset';
    size?: 'medium' | 'small';
    /**
     * Different states such as success or danger or warning
     */
    state?: 'success' | 'danger' | 'warning' | 'default';
    disabled?: boolean;
    onClick?: (event: MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
