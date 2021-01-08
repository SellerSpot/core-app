import { socketService } from 'services/services';
import { IResponse } from 'typings/response.types';

export const deleteTenantAccount = async (): Promise<boolean> => {
    let data: boolean;
    try {
        const response = await socketService.request('AUTH_DELETE_TENANT_ACCOUNT');
        data = response.status;
        if (!response.status) throw response;
    } catch (error) {
        console.error(error);
    }
    return Promise.resolve(data);
};
