import React, { ReactElement } from 'react';

export interface IWorkspaceTileProps {
    /**
     * Custom css class for the component
     */
    className?: {
        wrapper?: string;
        expanded?: string;
        selected?: string;
        avatar?: string;
        title?: string;
    };
    /**
     * Custom inline styling for the component
     */
    style?: {
        wrapper?: React.CSSProperties;
        avatar?: React.CSSProperties;
        title?: string;
    };
    /**
     * The workspace icon to show
     * @default HomeWorkspaceIcon
     */
    workspaceIcon?: ReactElement;
    /**
     * Toggles the tile to expanded state
     * @default false
     */
    expanded?: boolean;
    /**
     * Toggles the tile to selected state
     * @default false
     */
    selected?: boolean;
    /**
     * Title for the tile
     * @default "Home"
     */
    workspaceTitle?: string;
}
