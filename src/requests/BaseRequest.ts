import { isObject } from 'lodash';
import { ROUTES } from '@sellerspot/universal-types';
import { IRequestPayload } from 'services/ApiService';
import { apiService } from 'services/services';

type TQueryPayload = {
    [key: string]: unknown;
};

export default class BaseRequest {
    private service: keyof typeof ROUTES.SERVICE;

    constructor(service: keyof typeof ROUTES.SERVICE) {
        this.service = service;
    }

    private getServiceEndPoint(service?: keyof typeof ROUTES.SERVICE) {
        return ROUTES.SERVICE[service ?? this.service];
    }

    private getUrl(requestPayload: IRequestPayload): string {
        const { service, url, paramBody, queryBody } = requestPayload;
        const resultRoute = this.getParams(url, paramBody).concat(this.getQueryParams(queryBody));
        return this.getServiceEndPoint(service).concat(resultRoute);
    }

    protected request(requestPayload: IRequestPayload): ReturnType<typeof apiService.request> {
        return apiService.request({
            ...requestPayload,
            url: this.getUrl(requestPayload),
        });
    }

    private getParams(route: string, payloadRef: unknown): string {
        const resultRoute = route;
        const payload = payloadRef as TQueryPayload;
        if (!isObject(payload)) return resultRoute;
        const payloadKeys = Object.keys(payload);
        payloadKeys.forEach((paramKey) => {
            resultRoute.replace(`:${paramKey}`, <string>payload[paramKey]);
        });
        return resultRoute;
    }

    private getQueryParams(payloadRef: unknown): string {
        const payload = payloadRef as TQueryPayload;
        if (!isObject(payload)) return '';
        const payloadKeys = Object.keys(payload);
        return payloadKeys.reduce((result, current, index) => {
            if (index === 0) {
                result.concat('?');
            } else {
                result.concat('&');
            }

            if (payload[current] !== undefined) {
                result.concat(current);
                result.concat('=');
                result.concat(<string>payload[current]);
            }
            return result;
        });
    }
}
