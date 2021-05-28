import { ReactElement } from 'react';

export interface WorkSpaceTiles {
    /**
     * Title for the WorkSpaceTile
     */
    title: string;
    /**
     * Icon for the WorkSpaceTile
     */
    icon: ReactElement;
    /**
     * Redirect route for the WorkSpaceTile
     */
    redirectRoute: string;
    /**
     * If the current tile should be selected or not
     */
    selected: boolean;
}

export type IUseWorkSpaceMenuStore = {
    hoverMenu: boolean;
    expandMenu: boolean;
    setHoverMenu: (value: boolean) => void;
    setExpandMenu: (value: boolean) => void;
};
