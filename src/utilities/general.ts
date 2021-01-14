import { IInstalledAppLaunchDomainResponse } from 'typings/response.types';
import { IAppDomainUrl } from 'typings/utilities.types';

/**
 *
 * @param delay in seconds
 * @default
 * 4000
 */
export const introduceDelay = async (delay = 4000): Promise<boolean> =>
    new Promise((resolve) =>
        setTimeout(() => {
            resolve(true);
        }, delay),
    );

/**
 *
 * @param appDomainDetails typeof IInstalledAppLaunchDomainResponse
 * @returns a object
 * ```
 * {
 *  isValid: boolean;
 *  url: string;
 * }
 * ```
 */
export const getDomainUrlFromAppDomainDetails = (
    appDomainDetails: IInstalledAppLaunchDomainResponse,
): IAppDomainUrl => {
    let isValid = true;
    Object.keys(appDomainDetails).some((key) => {
        if (key !== ('customDomain' as keyof typeof appDomainDetails))
            if (!appDomainDetails[key as keyof typeof appDomainDetails]) {
                isValid = false;
            }
    });
    return {
        isValid,
        url: `${appDomainDetails.protocol}://${appDomainDetails.tenantDomain}.${appDomainDetails.appDomain}.${appDomainDetails.baseDomain}`,
    };
};
