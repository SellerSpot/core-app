import {
    ICreateCategoryRequest,
    ICreateCategoryResponse,
    IGetAllCategoryResponse,
    ROUTES,
} from '@sellerspot/universal-types';
import BaseRequest from 'requests/BaseRequest';

export default class CategoryRequest extends BaseRequest {
    constructor() {
        super('CATALOGUE');
    }

    getAllCategory = async (): Promise<IGetAllCategoryResponse> => {
        return <IGetAllCategoryResponse>await this.request({
            url: ROUTES.CATALOGUE.CATEGORY.GET_ALL,
            method: 'GET',
        });
    };

    createNewCategory = async (
        values: ICreateCategoryRequest,
    ): Promise<ICreateCategoryResponse> => {
        return <ICreateCategoryResponse>await this.request({
            url: ROUTES.CATALOGUE.CATEGORY.CREATE,
            method: 'POST',
            payload: values,
        });
    };
}
