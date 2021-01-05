import { socketService } from 'services/services';
import { IAppResponse } from 'typings/response.types';

export const getTenantInstalledApps = async (): Promise<IAppResponse[]> => {
    let data: IAppResponse[] = [];
    try {
        const response = await socketService.request('APP_GET_TENANT_INSTALLED_APPS');
        if (response.status) {
            const apps = response.data as IAppResponse[];
            data = apps;
        } else {
            throw response;
        }
    } catch (error) {
        console.error(error);
        data = [];
    }
    return Promise.resolve(data);
};
