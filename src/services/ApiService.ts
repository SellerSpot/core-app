import Axios, { AxiosError, AxiosInstance } from 'axios';
import {
    IResponse,
    IErrorResponse,
    ERROR_CODE,
    REQUEST_METHOD,
    ROUTES,
} from '@sellerspot/universal-types';
import { CONFIG } from 'config/config';
import { showNotify } from '@sellerspot/universal-components';

export interface IApiServiceProps {
    token?: string;
}

export interface IRequestPayload {
    url: string;
    method: keyof typeof REQUEST_METHOD;
    /**
     * if a request has a body pass it via payload
     */
    payload?: unknown;
    /**
     * pass the param body object, request library will auto place the properties where ever it needs to be
     */
    param?: unknown;
    /**
     * pass the query body object, request library will auto place the properties where ever it needs to be
     */
    query?: unknown;
    /**
     * pass service to override default scoped service of the class
     */
    service?: keyof typeof ROUTES.SERVICE;
}

export default class ApiService {
    private axios: AxiosInstance;

    constructor(props?: IApiServiceProps) {
        this.initiateService(props);
    }

    public initiateService = async (props?: IApiServiceProps): Promise<void> => {
        const { SERVER_URL } = CONFIG;
        const {} = props;
        this.axios = Axios.create({
            baseURL: SERVER_URL,
            headers: {
                // AUTHORIZATION: `Bearer ${props?.token}`,
            },
            withCredentials: true, // set true to attach cookie along with all requests
        });
    };

    public async request(requestPayload: IRequestPayload): Promise<IResponse> {
        try {
            const { url, method, payload } = requestPayload;
            const { data, status } = await this.axios.request({
                url,
                method,
                data: payload,
            });
            if (data.status !== undefined) {
                return data;
            } else if ([200, 204].includes(status)) {
                // success but not getting body - response handler
                return { status: true };
            } else {
                throw new Error('unknown error');
            }
        } catch (errorInstance) {
            return this.errorHandler(errorInstance);
        }
    }

    private errorHandler(errorInstance: AxiosError): IResponse {
        const data: IResponse = errorInstance?.response?.data;
        const { status, error } = data ?? {};
        const hasKnownError = [status, error].every((item) => item !== undefined);
        if (hasKnownError) {
            const { code } = error;
            switch (code) {
                case ERROR_CODE.NOT_AUTHENTICATED_USER:
                    // unauthenticate and redirect to corresponding location
                    showNotify('Please login to continue');
                    return data;
                default:
                    // direct errors which will be direclty handled inside the components
                    return data;
            }
        } else {
            // uncaught like connectivity / not reachable errors will be caught here
            const errorResponse: IErrorResponse = {
                code: ERROR_CODE.UNKNOWN_ERROR,
                message: 'Something went wrong, please try again later!',
            };
            showNotify(errorResponse.message);
            return { status: false, error: errorResponse };
        }
    }
}
