import { IPlugin } from '@sellerspot/universal-types';
import { requests } from 'requests/requests';

export default class ViewPluginServie {
    static fetchPluginDetails = async (pluginId: string): Promise<IPlugin> => {
        const { status, data, error } =
            await requests.management.pluginStoreRequest.getPluginDetailsById(pluginId);
        if (status && data) {
            return data;
        } else {
            throw new Error(error.message);
        }
    };
}
