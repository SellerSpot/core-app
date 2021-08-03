import {
    ICheckDomainAvailabilityResponse,
    ICheckDomainAvailablityRequestQuery,
    IDomainUpdateRequest,
    IDomainUpdateResponse,
    ROUTES,
} from '@sellerspot/universal-types';

import BaseRequest from '../BaseRequest';

export default class DomainSettingsRequest extends BaseRequest {
    constructor() {
        super('AUTH');
    }

    async checkDomainAvailability(domainName: string): Promise<ICheckDomainAvailabilityResponse> {
        const query: ICheckDomainAvailablityRequestQuery = {
            domain: domainName,
        };
        return await this.request({
            url: ROUTES.AUTH.DOMAIN.CHECK_DOMAIN_AVAILABILITY,
            method: 'GET',
            query,
        });
    }

    async updateDomain(domain: string): Promise<IDomainUpdateResponse> {
        return <IDomainUpdateResponse>await this.request({
            url: ROUTES.CORE.DOMAIN.UPDATE_DOMAIN,
            method: 'PUT',
            payload: <IDomainUpdateRequest>{ domain },
            service: 'CORE',
        });
    }
}
