import { SOCKET_EVENTS } from 'config/socketEvents';
import { socketService } from 'services/services';
import {
    IGetTenantInstalledAppByIdOrSlugRequest,
    IAppUnInstallRequest,
} from 'typings/request.types';
import { IAppResponse } from 'typings/response.types';

export const getTenantInstalledAppByIdOrSlug = async (
    slugOrId: string,
    isId = false,
): Promise<IAppResponse | undefined> => {
    let data: IAppResponse;
    try {
        const socketEvent: keyof typeof SOCKET_EVENTS = isId
            ? 'APP_GET_TENANT_INSTALLED_APP_BY_ID'
            : 'APP_GET_TENANT_INSTALLED_APP_BY_SLUG';
        const response = await socketService.request(socketEvent, {
            appId: slugOrId,
        } as IGetTenantInstalledAppByIdOrSlugRequest);
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

export const uninstallTenantInstalledAppById = async (
    appId: string,
): Promise<IAppResponse[] | undefined> => {
    let data: IAppResponse[];
    try {
        const response = await socketService.request('APP_UNINSTALL', {
            appId: appId,
        } as IAppUnInstallRequest);
        if (response.status) {
            const app = response.data as IAppResponse[];
            if (app) {
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
