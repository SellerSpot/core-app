import { ROUTES } from '@sellerspot/universal-types';
import BaseRequest from 'requests/BaseRequest';
import { ICatalogueBrands_GetAllBrands } from 'requests/typings/Catalogue/CatalogueBrands.types';
import { introduceDelay } from 'utilities/general';

export default class CatalogueBrandsRequest extends BaseRequest {
    constructor() {
        super(ROUTES.SERVICE.CATALOGUE);
    }

    getAllBrands = async (): Promise<ICatalogueBrands_GetAllBrands['data']> => {
        await introduceDelay(3000);
        return [
            {
                name: 'Pepsi',
                description: 'Sample Description',
                noOfProducts: 12,
            },
            {
                name: 'Miranda',
                description: 'Sample Description',
                noOfProducts: 123,
            },
            {
                name: 'Boltono',
                description: 'Sample Description',
                noOfProducts: 121,
            },
        ];
    };
}
