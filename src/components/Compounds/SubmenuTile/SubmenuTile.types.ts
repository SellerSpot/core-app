import React, { ReactElement } from 'react';

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
}
