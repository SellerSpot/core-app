import { IGetAllBrandsResponse, ROUTES } from '@sellerspot/universal-types';
import BaseRequest from 'requests/BaseRequest';
import { introduceDelay } from 'utilities/general';

export default class CatalogueBrandsRequest extends BaseRequest {
    constructor() {
        super(ROUTES.SERVICE.CATALOGUE);
    }

    getAllBrands = async (): Promise<IGetAllBrandsResponse['data']> => {
        await introduceDelay(3000);
        return [
            {
                id: 'asdfasdfasdf',
                name: 'Pepsi',
                description: 'Sample Description',
            },
            {
                id: 'asdfasdfasdf',
                name: 'Miranda',
                description: 'Sample Description',
            },
            {
                id: 'asdfasdf',
                name: 'Boltono',
                description: 'Sample Description',
            },
        ];
    };
}
