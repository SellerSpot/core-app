import BaseRequest from 'requests/BaseRequest';
import {
    IGetAllPluginsResponse,
    IGetPluginDetailsByIdResponse,
    IInstallPluginResponse,
    IUnInstallPluginResponse,
    ROUTES,
} from '@sellerspot/universal-types';

export default class PluginStoreRequest extends BaseRequest {
    constructor() {
        super('CORE');
    }

    getAllPlugins = async (): Promise<IGetAllPluginsResponse> => {
        return <IGetAllPluginsResponse>await this.request({
            method: 'GET',
            url: ROUTES.CORE.GET_ALL_PLUGINS,
        });
    };

    getPluginDetailsById = async (pluginId: string): Promise<IGetPluginDetailsByIdResponse> => {
        return <IGetPluginDetailsByIdResponse>await this.request({
            url: ROUTES.CORE.GET_PLUGIN_DETAILS_BY_ID.replace(':id', pluginId),
            method: 'GET',
        });
    };

    installPlugin = async (pluginId: string): Promise<IInstallPluginResponse> => {
        return <IInstallPluginResponse>await this.request({
            url: ROUTES.CORE.INSTALL_PLUGIN.replace(':id', pluginId),
            method: 'POST',
        });
    };

    unInstallPlugin = async (pluginId: string): Promise<IUnInstallPluginResponse> => {
        return <IUnInstallPluginResponse>await this.request({
            url: ROUTES.CORE.UNINSTALL_PLUGIN.replace(':id', pluginId),
            method: 'DELETE',
        });
    };
}
