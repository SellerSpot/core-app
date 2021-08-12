import BaseRequest from 'requests/BaseRequest';
import { ROUTES } from '@sellerspot/universal-types';
import { IGetAllOutletResponse } from '@sellerspot/universal-types';

export default class OutletRequest extends BaseRequest {
    constructor() {
        super('CATALOGUE');
    }

    getAllOutlet = async (): Promise<IGetAllOutletResponse> => {
        return <IGetAllOutletResponse>await this.request({
            url: ROUTES.CATALOGUE.OUTLET.GET_ALL,
            method: 'GET',
        });
    };
}
