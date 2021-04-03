import { ReactNode } from 'react';

export interface IExpandableCardProps {
    expanded: boolean;
    className?: {
        card?: string;
        summaryWrapper?: string;
        detailsWrapper?: string;
    };
    content: {
        summaryContent: ReactNode;
        detailsContent: ReactNode;
    };
}
