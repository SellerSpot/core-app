import { socketService } from 'services/services';
import { IResponse } from 'typings/request.types';

export const getAppById = async (id: string): Promise<IResponse> => {
    return await socketService.request('APP_GET_APP_BY_ID', { appId: id });
};
