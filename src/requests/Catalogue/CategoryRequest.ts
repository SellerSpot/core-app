import {
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
            payload: <ICreateCategoryRequest>values,
        });
    };

    editCategory = async (
        values: IEditCategoryRequest & { categoryId: string },
    ): Promise<IEditCategoryResponse> => {
        // values
        const { categoryId, title } = values;
        return <ICreateCategoryResponse>await this.request({
            url: ROUTES.CATALOGUE.CATEGORY.EDIT.replace(':id', categoryId),
            method: 'PUT',
            payload: <IEditCategoryRequest>{
                title,
            },
        });
    };

    editChildrenOrder = async (
        values: IEditCategoryChildrenOrderRequest & { parentId: string },
    ): Promise<IEditCategoryChildrenOrderResponse> => {
        // values
        const { childrenOrder, parentId } = values;
        return <IEditCategoryChildrenOrderResponse>await this.request({
            url: ROUTES.CATALOGUE.CATEGORY.EDIT_CHILDREN_ORDER.replace(':parentid', parentId),
            method: 'PUT',
            payload: <IEditCategoryChildrenOrderRequest>{
                childrenOrder,
            },
        });
    };

    editCategoryPosition = async (
        values: IEditCategoryPositionRequest & { categoryId: string },
    ): Promise<IEditCategoryPositionResponse> => {
        // values
        const { categoryId, newParentId, oldParentId } = values;
        return <IEditCategoryPositionResponse>await this.request({
            url: ROUTES.CATALOGUE.CATEGORY.EDIT_POSITION.replace(':id', categoryId),
            method: 'PUT',
            payload: <IEditCategoryPositionRequest>{
                newParentId,
                oldParentId,
            },
        });
    };

    deleteCategory = async (values: { categoryId: string }): Promise<void> => {
        // values
        const { categoryId } = values;
        await this.request({
            url: ROUTES.CATALOGUE.CATEGORY.DELETE.replace(':id', categoryId),
            method: 'DELETE',
        });
    };
}
