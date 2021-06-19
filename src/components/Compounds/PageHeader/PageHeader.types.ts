import { ReactElement } from 'react';

export interface IPageHeaderProps {
    title: string;
    actionsLHS?: ReactElement[];
    actions?: ReactElement[];
}
