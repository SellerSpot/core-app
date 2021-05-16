import { IRequestPayload } from 'services/ApiService';
import { apiService } from 'services/services';

export default class BaseRequest {
    private service: string;

    constructor(service: string) {
        this.service = service;
    }

    private getUrl(route: string): string {
        return `${this.service}${route}`;
    }

    public request(requestPayload: IRequestPayload): ReturnType<typeof apiService.request> {
        return apiService.request({ ...requestPayload, url: this.getUrl(requestPayload.url) });
    }
}
