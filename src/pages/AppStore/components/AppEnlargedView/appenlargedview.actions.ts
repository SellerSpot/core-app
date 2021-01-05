import { socketService } from 'services/services';
import { IAppInstallRequest, IGetAppByIdRequest } from 'typings/request.types';
import { IAppResponse, IResponse } from 'typings/response.types';

export const getAppById = async (id: string): Promise<IAppResponse | undefined> => {
    let data: IAppResponse;
    try {
        const response = await socketService.request('APP_GET_APP_BY_ID', {
            appId: id,
        } as IGetAppByIdRequest);
        const app = response.data;
        if (app) {
            data = app;
        }
    } catch (error) {
        console.error(error);
    }
    return data;
};

export const installApp = async (id: string): Promise<IAppResponse[] | undefined> => {
    let data: IAppResponse[];
    try {
        const response = await socketService.request('APP_INSTALL', {
            appId: id,
        } as IAppInstallRequest);
        const appsResponse = response.data as IAppResponse[];
        if (appsResponse) {
            data = appsResponse;
        }
    } catch (error) {
        console.error(error);
    }
    return data;
};
