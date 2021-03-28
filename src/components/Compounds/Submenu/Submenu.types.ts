import { IComponentEvents } from 'typings/common.types';

interface ITile {
    /**
     * Title of SubmenuTile
     */
    title: string;
    /**
     * Toggles to the selected state of the tile
     */
    selected: boolean;
    /**
     * Toggles to indicate that the child tiles are visible
     */
    childTilesVisible?: boolean;
    /**
     * Event handlers for the tile
     */
    events?: IComponentEvents;
    /**
     * Tile definitions for the children tiles (if present)
     */
    childTiles?: Pick<ITile, 'title' | 'selected' | 'events'>[];
}

export interface ISubmenuProps {
    /**
     * SubmenuTiles to be shown in menu
     */
    tiles: ITile[];
}
