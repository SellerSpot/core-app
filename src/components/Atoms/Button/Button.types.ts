export interface IButtonProps {
    /**
     * Content to display inside the button
     */
    label?: string;

    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
