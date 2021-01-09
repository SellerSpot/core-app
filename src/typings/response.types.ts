export interface IResponse {
    status: boolean;
    statusCode: number;
    data: unknown;
}

export interface IAuthResposne {
    id: string;
    email: string;
    name: string;
    token: string;
    subDomain: ISubDomainResponse;
    apps: IAppResponse[];
}

export interface ISubDomainResponse {
    createdAt: string;
    domainName: string;
    tenantId: string;
    updatedAt: string;
    _id: string;
    baseDomain: string;
}

export interface IAppResponse {
    _id?: string;
    name?: string;
    slug?: string;
    shortDescription?: string;
    longDescription?: string;
    iconUrl?: string;
    bannerImages?: string[];
    createdAt?: string;
    updatedAt?: string;
}

export interface IInstalledAppLaunchDomainResponse {
    tenantDomain: string;
    appDomain: string;
    baseDomain: string;
    customDomain: string;
    protocol: string;
}

export interface ISubDomainCheckResponse {
    available: boolean;
}
