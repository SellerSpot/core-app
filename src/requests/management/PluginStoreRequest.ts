import BaseRequest from 'requests/BaseRequest';
import {
    IGetAllPluginsResponse,
    IGetPluginDetailByIdRequest,
    IGetPluginDetailsByIdResponse,
    IInstallPluginRequest,
    IInstallPluginResponse,
    IUnInstallPluginRequest,
    IUnInstallPluginResponse,
    ROUTES,
} from '@sellerspot/universal-types';

export default class PluginStoreRequest extends BaseRequest {
    constructor() {
        super('CORE');
    }

    getAllPlugins = async (): Promise<IGetAllPluginsResponse> => {
        return <IGetAllPluginsResponse>await this.request({
            url: ROUTES.CORE.PLUGIN.GET_ALL_PLUGINS,
            method: 'GET',
        });
    };

    getPluginDetailsById = async (pluginId: string): Promise<IGetPluginDetailsByIdResponse> => {
        const param: IGetPluginDetailByIdRequest = {
            id: pluginId,
        };
        return <IGetPluginDetailsByIdResponse>await this.request({
            url: ROUTES.CORE.PLUGIN.GET_PLUGIN_DETAILS_BY_ID,
            method: 'GET',
            param,
        });
    };

    installPlugin = async (pluginId: string): Promise<IInstallPluginResponse> => {
        const param: IInstallPluginRequest = {
            id: pluginId,
        };
        return <IInstallPluginResponse>await this.request({
            url: ROUTES.CORE.PLUGIN.INSTALL_PLUGIN,
            method: 'POST',
            param,
        });
    };

    unInstallPlugin = async (pluginId: string): Promise<IUnInstallPluginResponse> => {
        const param: IUnInstallPluginRequest = {
            id: pluginId,
        };
        return <IUnInstallPluginResponse>await this.request({
            url: ROUTES.CORE.PLUGIN.UNINSTALL_PLUGIN,
            method: 'DELETE',
            param,
        });
    };
}
