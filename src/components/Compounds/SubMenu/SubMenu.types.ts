import { IconifyIcon } from '@iconify/react';
import { TRouteKeys } from 'config/routes';

interface ITile {
    /**
     * Title of SubMenuTile
     */
    title: string;
    /**
     * Leading icon for the SubMenuTile
     */
    icon: IconifyIcon['icon'];
    /**
     * Toggles the disabled state for the tile
     */
    disabled?: boolean;
    /**
     * Route to redirect the application to for this tile
     */
    redirectRoute?: string;
    /**
     * to uniquely identify each route
     */
    routeKey: TRouteKeys;
    /**
     * Tile definitions for the children tiles (if present)
     */
    childTiles?: Pick<ITile, 'title' | 'disabled' | 'redirectRoute' | 'routeKey'>[];
}

export interface ISubMenuProps {
    /**
     * SubMenuTiles to be shown in menu
     */
    tiles: ITile[];
}
