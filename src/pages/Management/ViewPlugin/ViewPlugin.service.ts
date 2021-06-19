import { IPlugin } from '@sellerspot/universal-types';
import { requests } from 'requests/requests';
import { updateInstalledPlugins } from 'store/models/app';
import { store } from 'store/store';

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

    static installPlugin = async (pluginId: string): Promise<boolean> => {
        const { status, data, error } = await requests.management.pluginStoreRequest.installPlugin(
            pluginId,
        );
        if (status && data) {
            store.dispatch(updateInstalledPlugins(data));
            return true;
        } else {
            throw error;
        }
    };

    static unInstallPlugin = async (pluginId: string): Promise<boolean> => {
        const { status, data, error } =
            await requests.management.pluginStoreRequest.unInstallPlugin(pluginId);
        if (status && data) {
            store.dispatch(updateInstalledPlugins(data));
            return true;
        } else {
            throw error;
        }
    };
}
