import {
    ICheckDomainAvailabilityResponse,
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
        return await this.request({
            url: `${ROUTES.AUTH.CHECK_DOMAIN_AVAILABILITY}?domain=${domainName}`,
            method: 'GET',
        });
    }

    async updateDomain(domain: string): Promise<IDomainUpdateResponse> {
        return <IDomainUpdateResponse>await this.request({
            url: `${ROUTES.CORE.UPDATE_DOMAIN}`,
            method: 'PUT',
            payload: <IDomainUpdateRequest>{ domain },
            service: 'CORE',
        });
    }
}
