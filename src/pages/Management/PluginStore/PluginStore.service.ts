import { IPlugin } from '@sellerspot/universal-types';
import { requests } from 'requests/requests';

export default class PluginStoreService {
    static getAllPlugins = async (): Promise<IPlugin[]> => {
        const allPluginsResponse = await requests.management.pluginStoreRequest.getAllPlugins();
        if (allPluginsResponse.status) {
            return allPluginsResponse.data;
        } else {
            throw new Error(allPluginsResponse?.error?.message ?? 'Something went wrong');
        }
    };
}
