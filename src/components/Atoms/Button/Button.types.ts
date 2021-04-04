export interface IButtonProps {
    /**
     * Content to display inside the button
     */
    label?: string;
    type?: 'submit' | 'button' | 'reset';
    /**
     * Different styles of buttons
     */
    varient?: 'contained' | 'text' | 'outlined';
    size?: 'small' | 'medium' | 'large';
    /**
     * Different states such as success or danger or warning
     */
    state?: 'success' | 'danger' | 'warning' | 'default';
    disabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
