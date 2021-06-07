import {
    ICreateBrandRequest,
    ICreateBrandResponse,
    IGetAllBrandResponse,
} from '@sellerspot/universal-types';
import BaseRequest from 'requests/BaseRequest';
import { generateRandomString, introduceDelay } from 'utilities/general';

type IBrandData = IGetAllBrandResponse['data'][0];

interface ICatalogServer {
    brands: IBrandData[];
    getAllBrand: () => IGetAllBrandResponse;
    createBrand: (brandData: ICreateBrandRequest) => ICreateBrandResponse;
}

const catalogueServer: ICatalogServer = {
    brands: <IBrandData[]>[],
    getAllBrand: () => {
        return {
            status: true,
            data: catalogueServer.brands,
        };
    },
    createBrand: (brandData: ICreateBrandRequest): ICreateBrandResponse => {
        const { name } = brandData;
        const newBrandData: IBrandData = {
            id: generateRandomString(),
            name,
        };
        catalogueServer.brands = [newBrandData, ...catalogueServer.brands];
        return {
            status: true,
            data: newBrandData,
        };
    },
};

export default class CatalogueBrandsRequest extends BaseRequest {
    constructor() {
        super('CATALOGUE');
    }

    getAllBrand = async (): Promise<IGetAllBrandResponse> => {
        await introduceDelay(1000);

        const response = catalogueServer.getAllBrand();
        return response;
    };

    createBrand = async (data: ICreateBrandRequest): Promise<ICreateBrandResponse> => {
        await introduceDelay(1000);

        const response = catalogueServer.createBrand(data);
        return response;
    };
}
