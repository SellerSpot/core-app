import { socketService } from 'services/services';
import { IGetTenantInstalledAppByIdRequest } from 'typings/request.types';
import { IAppResponse } from 'typings/response.types';

export const getTenantInstalledAppById = async (id: string): Promise<IAppResponse | undefined> => {
    let data: IAppResponse;
    try {
        const response = await socketService.request('APP_GET_TENANT_INSTALLED_APP_BY_ID', {
            appId: id,
        } as IGetTenantInstalledAppByIdRequest);
        if (response.status) {
            const app = response.data as IAppResponse;
            if (app?._id) {
                data = app;
            } else {
                throw response;
            }
        }
    } catch (error) {
        console.error(error);
    }

    return Promise.resolve(data);
};
