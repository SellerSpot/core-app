export interface IResponse {
    status: boolean;
    statusCode: number;
    data: unknown;
}

export interface ISubDomainResponse {
    createdAt: string;
    domainName: string;
    tenantId: string;
    updatedAt: string;
    _id: string;
}

export interface IAppResponse {
    _id?: string;
    name?: string;
    shortDescription?: string;
    longDescription?: string;
    iconUrl?: string;
    bannerImages?: string[];
    createdAt?: string;
    updatedAt?: string;
}
