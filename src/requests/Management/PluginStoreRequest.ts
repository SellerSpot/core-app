import BaseRequest from 'requests/BaseRequest';
import { IGetAllPluginsResponse, ROUTES } from '@sellerspot/universal-types/dist';

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
}
