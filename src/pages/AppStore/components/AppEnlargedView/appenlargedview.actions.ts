import { socketService } from 'services/services';
import { IAppInstallRequest, IGetAppByIdRequest } from 'typings/request.types';
import { IResponse } from 'typings/response.types';

export const getAppById = async (id: string): Promise<IResponse> => {
    return await socketService.request('APP_GET_APP_BY_ID', { appId: id } as IGetAppByIdRequest);
};

export const installApp = async (id: string): Promise<IResponse> => {
    return await socketService.request('APP_INSTALL', { appId: id } as IAppInstallRequest);
};
