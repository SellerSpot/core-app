import { ReactElement } from 'react';

export interface IWorkspaceTileProps {
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
