import { TRouteKeys } from 'config/routes';
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
     * Route key to uniquely identify each route
     */
    routeKey: TRouteKeys;
}

export type IUseWorkSpaceMenuStore = {
    hoverMenu: boolean;
    expandMenu: boolean;
    setHoverMenu: (value: boolean) => void;
    setExpandMenu: (value: boolean) => void;
};
