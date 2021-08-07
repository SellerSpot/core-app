import BaseRequest from 'requests/BaseRequest';
import { ROUTES } from '@sellerspot/universal-types';
import { IGetAllInventoryProductResponse } from '@sellerspot/universal-types';

export default class InventoryRequest extends BaseRequest {
    constructor() {
        super('POS');
    }

    getAllProduct = async (): Promise<IGetAllInventoryProductResponse> => {
        return <IGetAllInventoryProductResponse>await this.request({
            url: ROUTES.POS.INVENTORY.GET_ALL,
            method: 'GET',
        });
    };
}
