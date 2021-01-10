import { IAppResponse, IInstalledAppLaunchDomainResponse } from 'typings/response.types';

export interface IInstalledAppDashboardProps {
    appDetails: IAppResponse;
    appDomainDetails: IInstalledAppLaunchDomainResponse;
}
