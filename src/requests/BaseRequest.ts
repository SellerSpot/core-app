import { ROUTES } from '@sellerspot/universal-types';
import { IRequestPayload } from 'services/ApiService';
import { apiService } from 'services/services';

export default class BaseRequest {
    private service: keyof typeof ROUTES.SERVICE;

    constructor(service: keyof typeof ROUTES.SERVICE) {
        this.service = service;
    }

    private getServiceEndPoint(service: keyof typeof ROUTES.SERVICE = this.service) {
        return ROUTES.SERVICE[service];
    }

    private getUrl(route: string, service = this.service): string {
        return `${this.getServiceEndPoint(service)}${route}`;
    }

    protected request(requestPayload: IRequestPayload): ReturnType<typeof apiService.request> {
        return apiService.request({
            ...requestPayload,
            url: this.getUrl(requestPayload.url, requestPayload.service),
        });
    }
}
