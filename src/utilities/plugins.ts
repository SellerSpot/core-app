// static plugins - non movable plugins like home, managements goes here
import { IconifyIcon } from '@iconify/react';

import { cashRegister, homeVariant } from './icons/mdi'; // for - point of sale plugin
import { outlineListAlt } from './icons/ic';
import { settingsIcon } from './icons/codicon';
import { TAllPlugins } from 'config/pluginsBaseRoutes';

export type TPluginIcons = {
    [key in TAllPlugins]: IconifyIcon['icon'];
};

export const PLUGIN_ICONS: TPluginIcons = {
    // default plugins
    HOME: homeVariant,
    MANAGEMENT: settingsIcon,
    // dynamic plugins
    POINT_OF_SALE: cashRegister,
    CATALOGUE: outlineListAlt,
};
