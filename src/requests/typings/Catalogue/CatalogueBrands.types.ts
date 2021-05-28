interface IBrand {
    name: string;
    description: string;
    noOfProducts: number;
}

export interface ICatalogueBrands_GetAllBrands {
    status: boolean;
    data: IBrand[];
}
