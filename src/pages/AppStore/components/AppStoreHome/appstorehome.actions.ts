import { socketService } from 'services/services';
import { IAppResponse } from 'typings/response.types';

export const getAllApps = async (): Promise<IAppResponse[]> => {
    let data: IAppResponse[] = [];
    try {
        const resposne = await socketService.request('APP_GET_ALL_APPS');
        const allApps = resposne.data as IAppResponse[];
        if (allApps) data = allApps;
    } catch (error) {
        console.error(error);
        data = [];
    }
    return data;
};
