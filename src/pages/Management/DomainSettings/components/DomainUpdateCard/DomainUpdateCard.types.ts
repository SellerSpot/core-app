export interface IDomainUpdateCardFormValues {
    domainName: string;
}

export type TUpdatFormError = {
    [k in keyof IDomainUpdateCardFormValues]: string;
};
