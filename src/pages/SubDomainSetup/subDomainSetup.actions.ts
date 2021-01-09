import { socketService } from 'services/services';
import { updateSubDomain } from 'store/models/subDomain';
import { store } from 'store/store';
import { ISubDomainUpdateRequest } from 'typings/request.types';
import { ISubDomainCheckResponse, ISubDomainResponse } from 'typings/response.types';

export const checkDomainAvailability = async (domainName: string): Promise<boolean> => {
    let isAvailable = false;

    try {
        const availabilityCheck = await socketService.request(
            'SUB_DOMAIN_AVAILABILITY_CHECK',
            domainName,
        );
        const availabilityCheckData = availabilityCheck.data as ISubDomainCheckResponse;
        isAvailable = availabilityCheckData.available ?? false;
    } catch (error) {
        console.error(error);
        isAvailable = false;
    }

    return Promise.resolve(isAvailable);
};

export const createTenantSubDomain = async (domainName: string): Promise<boolean> => {
    let isDomainCreated = false;
    try {
        const subDomainUpdateResponse = await socketService.request('SUB_DOMAIN_CREATE', {
            domainName,
        } as ISubDomainUpdateRequest);
        if (subDomainUpdateResponse.status) {
            const subDomainCreateData = subDomainUpdateResponse.data as ISubDomainResponse;
            store.dispatch(
                updateSubDomain({
                    domainName: subDomainCreateData.domainName,
                    id: subDomainCreateData._id,
                    baseDomain: subDomainCreateData.baseDomain,
                }),
            );
            isDomainCreated = true;
        } else {
            throw subDomainUpdateResponse;
        }
    } catch (error) {
        console.error(error);
        isDomainCreated = false;
    }

    return Promise.resolve(isDomainCreated);
};

export const updateTenantSubDomain = async (domainName: string): Promise<boolean> => {
    let isDomainUpdated = false;
    try {
        const subDomainUpdateResponse = await socketService.request('SUB_DOMAIN_UPDATE', {
            domainName,
        } as ISubDomainUpdateRequest);
        if (subDomainUpdateResponse.status) {
            const subDomainUpdatedData = subDomainUpdateResponse.data as ISubDomainResponse;
            store.dispatch(
                updateSubDomain({
                    domainName: subDomainUpdatedData.domainName,
                    id: subDomainUpdatedData._id,
                    baseDomain: subDomainUpdatedData.baseDomain,
                }),
            );
            isDomainUpdated = true;
        } else {
            throw subDomainUpdateResponse;
        }
    } catch (error) {
        console.error(error);
        isDomainUpdated = false;
    }

    return Promise.resolve(isDomainUpdated);
};
