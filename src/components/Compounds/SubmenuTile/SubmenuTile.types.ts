import React, { ReactElement } from 'react';

export interface ISubmenuTileProps {
    /**
     * Custom css class for the component
     */
    className?: {
        wrapper: string;
        avatar: string;
    };
    /**
     * Custom inline styling for the component
     */
    style?: {
        wrapper: React.CSSProperties;
        avatar: React.CSSProperties;
    };
    /**
     * Leading content for tile
     * @default HomeWorkspaceIcon
     */
    leading?: ReactElement;
    /**
     * Toggles the mini version of the tile
     * @default false
     */
    miniTile: boolean;
}
