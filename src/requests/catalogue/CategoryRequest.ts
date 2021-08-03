import {
    ICommonResourcePathParam,
    ICreateCategoryRequest,
    ICreateCategoryResponse,
    IEditCategoryChildrenOrderRequest,
    IEditCategoryChildrenOrderResponse,
    IEditCategoryPositionRequest,
    IEditCategoryPositionResponse,
    IEditCategoryRequest,
    IEditCategoryResponse,
    IGetAllCategoryResponse,
    ROUTES,
} from '@sellerspot/universal-types';
import BaseRequest from 'requests/BaseRequest';
import { IEditChildrenOrderPathParam } from '../../../.yalc/@sellerspot/universal-types/dist/catalogue/category/routes';

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
        payload: ICreateCategoryRequest,
    ): Promise<ICreateCategoryResponse> => {
        return <ICreateCategoryResponse>await this.request({
            url: ROUTES.CATALOGUE.CATEGORY.CREATE,
            method: 'POST',
            payload,
        });
    };

    editCategory = async (
        values: IEditCategoryRequest & { categoryId: string },
    ): Promise<IEditCategoryResponse> => {
        const { categoryId, title } = values;
        const payload: IEditCategoryRequest = {
            title,
        };
        const param: ICommonResourcePathParam = {
            id: categoryId,
        };
        return <ICreateCategoryResponse>await this.request({
            url: ROUTES.CATALOGUE.CATEGORY.EDIT,
            method: 'PUT',
            payload,
            param,
        });
    };

    editChildrenOrder = async (
        values: IEditCategoryChildrenOrderRequest & { parentId: string },
    ): Promise<IEditCategoryChildrenOrderResponse> => {
        const { childrenOrder, parentId } = values;
        const param: IEditChildrenOrderPathParam = {
            parentId,
        };
        const payload: IEditCategoryChildrenOrderRequest = {
            childrenOrder,
        };
        return <IEditCategoryChildrenOrderResponse>await this.request({
            url: ROUTES.CATALOGUE.CATEGORY.EDIT_CHILDREN_ORDER,
            method: 'PUT',
            payload,
            param,
        });
    };

    editCategoryPosition = async (
        values: IEditCategoryPositionRequest & { categoryId: string },
    ): Promise<IEditCategoryPositionResponse> => {
        const { categoryId, newParentId, oldParentId } = values;
        const param: ICommonResourcePathParam = {
            id: categoryId,
        };
        const payload: IEditCategoryPositionRequest = {
            newParentId,
            oldParentId,
        };
        return <IEditCategoryPositionResponse>await this.request({
            url: ROUTES.CATALOGUE.CATEGORY.EDIT_POSITION,
            method: 'PUT',
            payload,
            param,
        });
    };

    deleteCategory = async (values: { categoryId: string }): Promise<void> => {
        const { categoryId } = values;
        const param: ICommonResourcePathParam = {
            id: categoryId,
        };
        await this.request({
            url: ROUTES.CATALOGUE.CATEGORY.DELETE,
            method: 'DELETE',
            param,
        });
    };
}
