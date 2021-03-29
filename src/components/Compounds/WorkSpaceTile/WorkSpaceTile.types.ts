import { ReactElement } from 'react';
import { IComponentEvents } from 'typings/common.types';

export interface IWorkSpaceTileProps {
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
    /**
     * Events to be captured on the listTile
     */
    events?: IComponentEvents;
}