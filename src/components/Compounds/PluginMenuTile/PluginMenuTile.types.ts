import { IComponentEvents } from 'typings/common.types';
import { ReactElement } from 'react';

export interface IPluginMenuTileProps {
    pluginIcon?: ReactElement;
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
    pluginTitle?: string;
    /**
     * Events to be captured on the listTile
     */
    events?: IComponentEvents;
}
