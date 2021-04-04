export interface IIconButtonProps {
    /**
     * Content to display inside the button
     */
    children?: React.ReactNode;
    type?: 'submit' | 'button' | 'reset';
    size?: 'medium' | 'small';
    /**
     * Different states such as success or danger or warning
     */
    state?: 'success' | 'danger' | 'warning' | 'default';
    disabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
