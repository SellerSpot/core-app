import { TAllPlugins } from 'config/pluginsBaseRoutes';

import POINT_OF_SALE from './pos-plugin.png';
import CATALOGUE from './catalogue-plugin.png';

export type TPluginImages = {
    [key in TAllPlugins]: typeof POINT_OF_SALE;
};

export const PLUGIN_IMAGES: Partial<TPluginImages> = {
    POINT_OF_SALE,
    CATALOGUE,
};
