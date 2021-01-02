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
    __v: number;
    _id: string;
}
