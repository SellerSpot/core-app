import { IInstalledPlugin } from '@sellerspot/universal-types';
import { EDEFAULT_PLUGINS } from 'config/pluginsBaseRoutes';

export class PluginMenuService {
    static getDefaultPlugins = (): IInstalledPlugin[] => {
        return [
            {
                plugin: {
                    id: EDEFAULT_PLUGINS[EDEFAULT_PLUGINS.HOME], // in server, for other plugins, it will be 24 character hased value - mongo id
                    uniqueName: EDEFAULT_PLUGINS[EDEFAULT_PLUGINS.HOME],
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
                    id: EDEFAULT_PLUGINS[EDEFAULT_PLUGINS.MANAGEMENT], // in server, for other plugins, it will be 24 character hased value - mongo id
                    uniqueName: EDEFAULT_PLUGINS[EDEFAULT_PLUGINS.MANAGEMENT],
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
