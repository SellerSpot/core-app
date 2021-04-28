import { IComponentEvents } from 'typings/common.types';
import { ReactElement } from 'react';

export interface IWorkSpaceTileProps {
    /**
     * Text to show in tooltips
     */
    toolTipText?: string;
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
     * Toggles between default tile mode and WorkSpace Indicator Mode (no background)
     * @default 'tile'
     */
    variant?: 'tile' | 'workspaceIndicator';
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
