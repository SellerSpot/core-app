import { ReactElement } from 'react';

interface ITile {
    /**
     * Title of SubMenuTile
     */
    title: string;
    /**
     * Leading icon for the SubMenuTile
     */
    icon: ReactElement;
    /**
     * Toggles the disabled state for the tile
     */
    disabled: boolean;
    /**
     * Toggles to indicate that the child tiles are visible
     */
    childTilesVisible?: boolean;
    /**
     * Route to redirect the application to for this tile
     */
    redirectRoute: string;
    /**
     * Routes to watch for which means that this specific tile has been selected
     */
    routesToWatch: string[];
    /**
     * Tile definitions for the children tiles (if present)
     */
    childTiles?: Pick<ITile, 'title' | 'disabled' | 'routesToWatch' | 'redirectRoute'>[];
}

export interface ISubMenuProps {
    /**
     * SubMenuTiles to be shown in menu
     */
    tiles: ITile[];
}
