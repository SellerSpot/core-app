import { ReactElement } from 'react';

export interface ICardProps {
    className?: {
        cardWrapper?: string;
        mediaWrapper?: string;
        contentWrapper?: string;
        actionsWrapper?: string;
    };
    media?: ReactElement;
    content?: ReactElement;
    actions?: ReactElement;
    onClickCard?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
