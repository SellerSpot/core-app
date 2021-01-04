import { socketService } from 'services/services';
import { IResponse } from 'typings/response.types';

export const getAllApps = async (): Promise<IResponse> => {
    return await socketService.request('APP_GET_ALL_APPS');
};
