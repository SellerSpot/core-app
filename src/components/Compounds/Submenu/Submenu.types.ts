import { IComponentEvents } from 'typings/common.types';

interface ITile {
    /**
     * Title of SubmenuTile
     */
    title: string;
    /**
     * Toggles the disabled state for the tile
     */
    disabled: boolean;
    /**
     * Toggles to indicate that the child tiles are visible
     */
    childTilesVisible: boolean;
    /**
     * Event handlers for the tile
     */
    events?: IComponentEvents;
    /**
     * Paths to watch for which means that this specific tile has been selected
     */
    pathToWatch: string[];
    /**
     * Tile definitions for the children tiles (if present)
     */
    childTiles?: Pick<ITile, 'title' | 'events' | 'disabled' | 'pathToWatch'>[];
}

export interface ISubmenuProps {
    /**
     * SubmenuTiles to be shown in menu
     */
    tiles: ITile[];
}
