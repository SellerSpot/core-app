import { IconifyIcon } from '@iconify/react';
import { TRouteKeys } from 'config/routes';

export interface IWorkSpace {
    /**
     * Title for the WorkSpaceTile
     */
    title: string;
    /**
     * Icon for the WorkSpaceTile
     */
    icon: IconifyIcon['icon'];
    /**
     * Redirect route for the WorkSpaceTile
     */
    redirectRoute: string;
    /**
     * Route key to uniquely identify each route
     */
    routeKey: TRouteKeys;
}

export type TWorkSpaces = { [k in TRouteKeys]: IWorkSpace };

export type IUseWorkSpaceMenuStore = {
    hoverMenu: boolean;
    expandMenu: boolean;
    setHoverMenu: (value: boolean) => void;
    setExpandMenu: (value: boolean) => void;
};
