import { socketService } from 'services/services';
import { IAppResponse } from 'typings/response.types';

export const getAllApps = async (): Promise<IAppResponse[]> => {
    let data: IAppResponse[] = [];
    try {
        const resposne = await socketService.request('APP_GET_ALL_APPS');
        if (resposne.status) {
            const allApps = resposne.data as IAppResponse[];
            data = allApps;
        }
    } catch (error) {
        console.log(error);
        data = [];
    }
    return data;
};
