export interface IPageActionButton {
    messageLeft: string;
    messageRight: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
