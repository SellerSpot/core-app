import { IInstalledPlugin } from '@sellerspot/universal-types';
import { EDEFAULT_PLUGINS } from 'config/pluginsBaseRoutes';

export class PluginMenuService {
    static getDefaultPlugins = (): IInstalledPlugin[] => {
        return [
            {
                plugin: {
                    pluginId: EDEFAULT_PLUGINS[EDEFAULT_PLUGINS.HOME],
                    name: 'Home',
                    icon: EDEFAULT_PLUGINS[EDEFAULT_PLUGINS.HOME],
                    bannerImages: [],
                    dependantPlugins: [],
                    image: '',
                    isVisibleInPluginMenu: true,
                    isVisibleInPluginStore: false,
                    longDescription: '',
                    shortDescription: '',
                },
            },
            {
                plugin: {
                    pluginId: EDEFAULT_PLUGINS[EDEFAULT_PLUGINS.MANAGEMENT],
                    name: 'Management',
                    icon: EDEFAULT_PLUGINS[EDEFAULT_PLUGINS.MANAGEMENT],
                    bannerImages: [],
                    dependantPlugins: [],
                    image: '',
                    isVisibleInPluginMenu: true,
                    isVisibleInPluginStore: false,
                    longDescription: '',
                    shortDescription: '',
                },
            },
        ];
    };
}
