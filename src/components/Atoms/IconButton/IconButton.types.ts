import { ReactElement } from 'react';

export interface IIconButtonProps {
    /**
     * Content to display inside the button
     */
    icon?: ReactElement;
    type?: 'submit' | 'button' | 'reset';
    size?: 'medium' | 'small';
    /**
     * Different states such as success or danger or warning
     */
    state?: 'success' | 'danger' | 'warning' | 'default' | 'accent';
    disabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
