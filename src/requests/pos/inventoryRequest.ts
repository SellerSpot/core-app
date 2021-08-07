import BaseRequest from 'requests/BaseRequest';

export class InventoryRequest extends BaseRequest {
    constructor() {
        super('POS');
    }
}
