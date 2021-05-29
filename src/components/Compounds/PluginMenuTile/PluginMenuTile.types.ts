import { IComponentEvents } from 'typings/common.types';
import { ReactElement } from 'react';

export interface IPluginMenuTileProps {
    /**
     * Text to show in tooltips
     */
    toolTipText?: string;
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
     * Toggles between default tile mode and Plugin Indicator Mode (no background)
     * @default 'tile'
     */
    variant?: 'tile' | 'PluginIndicator';
    /**
     * Title for the tile
     * @default "Home"
     */
    pluginTitle?: string;
    /**
     * Events to be captured on the listTile
     */
    events?: IComponentEvents;
    size?: 'large' | 'small';
}
