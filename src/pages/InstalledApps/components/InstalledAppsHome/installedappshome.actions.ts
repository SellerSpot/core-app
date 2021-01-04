import { socketService } from 'services/services';
import { IResponse } from 'typings/response.types';

export const getTenantInstalledApps = async (): Promise<IResponse> => {
    return await socketService.request('APP_GET_TENANT_INSTALLED_APPS');
};
