import { ReactElement } from 'react';
import { IComponentEvents } from 'typings/common.types';

export interface ISubmenuTileProps {
    /**
     * Toggles tile to selected state
     * @default false
     */
    selected?: boolean;
    /**
     * Leading content for tile
     * @default HomeWorkspaceIcon
     */
    leading?: ReactElement;
    /**
     * Title for the tile
     * @default "Home"
     */
    title?: string;
    /**
     * Toggles the mini version of the tile
     * @default false
     */
    miniTile?: boolean;
    /**
     * Toggles the trailing icon state of the tile
     * @default false
     */
    showTailIcon?: boolean;
    /**
     * Toggles the opened state of the tile
     * (points the trailing arrow downward to indicate the child menu items are visible)
     * @default false
     */
    childTilesVisible?: boolean;
    /**
     * Events to be captured on the listTile
     */
    events?: IComponentEvents;
    /**
     * Toggles if the Submenu tile is disabled
     * @default false
     */
    disabled?: boolean;
}
