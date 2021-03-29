import { ReactElement } from 'react';

interface WorkSpaceTiles {
    /**
     * Title for the WorkSpaceTile
     */
    title: string;
    /**
     * Icon for the WorkSpaceTile
     */
    icon: ReactElement;
    /**
     * Redirect route for the WorkspaceTile
     */
    redirectRoute: string;
    /**
     * Routes which indicate that the current tile should be selected
     */
    routesToWatch: string[];
}

export interface IWorkSpaceMenuProps {
    tiles: WorkSpaceTiles[];
    storeInformation: {
        avatarContent: string;
        storeName: string;
    };
}
