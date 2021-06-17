import BaseRequest from 'requests/BaseRequest';
import {
    IGetAllPluginsResponse,
    IGetPluginDetailsByIdResponse,
    IInstallPluginRequest,
    IInstallPluginResponse,
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
            method: 'GET',
            url: `${ROUTES.CORE.GET_PLUGIN_DETAILS_BY_ID}?id=${pluginId}`,
        });
    };

    installPlugin = async (pluginId: string): Promise<IInstallPluginResponse> => {
        return <IInstallPluginResponse>await this.request({
            url: ROUTES.CORE.INSTALL_PLUGIN,
            method: 'POST',
            payload: <IInstallPluginRequest>{ pluginId },
        });
    };
}
