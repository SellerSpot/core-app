import {
    ICommonResourcePathParam,
    ICreateTaxBracketRequest,
    ICreateTaxBracketResponse,
    ICreateTaxGroupRequest,
    ICreateTaxGroupResponse,
    IDeleteTaxBracketResponse,
    IDeleteTaxGroupResponse,
    IEditTaxBracketRequest,
    IEditTaxBracketResponse,
    IEditTaxGroupRequest,
    IEditTaxGroupResponse,
    IGetAllTaxBracketResponse,
    IGetAllTaxGroupResponse,
    IResponse,
    ISearchResourceQueryParam,
    ISearchTaxBracketResponse,
    ROUTES,
} from '@sellerspot/universal-types';
import BaseRequest from 'requests/BaseRequest';

export default class TaxSettingsRequest extends BaseRequest {
    constructor() {
        super('CATALOGUE');
    }

    getAllTaxBracket = async (): Promise<IGetAllTaxBracketResponse> => {
        return <IGetAllTaxBracketResponse>await this.request({
            url: ROUTES.CATALOGUE.TAX_BRACKET.GET_ALL_BRACKET,
            method: 'GET',
        });
    };

    searchTaxBracket = async (query: string): Promise<ISearchTaxBracketResponse> => {
        const queryParams: ISearchResourceQueryParam = { query };
        return <ISearchTaxBracketResponse>await this.request({
            url: ROUTES.CATALOGUE.TAX_BRACKET.SEARCH_BRACKET,
            method: 'GET',
            query: queryParams,
        });
    };

    createNewTaxBracket = async (
        payload: ICreateTaxBracketRequest,
    ): Promise<ICreateTaxBracketResponse> => {
        return <ICreateTaxBracketResponse>await this.request({
            url: ROUTES.CATALOGUE.TAX_BRACKET.CREATE_BRACKET,
            method: 'POST',
            payload,
        });
    };

    deleteTaxBracket = async (taxBracketId: string): Promise<IResponse> => {
        const param: ICommonResourcePathParam = { id: taxBracketId };
        return <IDeleteTaxBracketResponse>await this.request({
            url: ROUTES.CATALOGUE.TAX_BRACKET.DELETE_BRACKET,
            method: 'DELETE',
            param,
        });
    };

    editTaxBracket = async (
        id: string,
        payload: IEditTaxBracketRequest,
    ): Promise<IEditTaxBracketResponse> => {
        const param: ICommonResourcePathParam = { id };
        return <IEditTaxBracketResponse>await this.request({
            url: ROUTES.CATALOGUE.TAX_BRACKET.EDIT_BRACKET,
            method: 'PUT',
            payload,
            param,
        });
    };

    getAllTaxGroup = async (): Promise<IGetAllTaxGroupResponse> => {
        return <IGetAllTaxGroupResponse>await this.request({
            url: ROUTES.CATALOGUE.TAX_BRACKET.GET_ALL_GROUP,
            method: 'GET',
        });
    };

    createNewTaxGroup = async (
        payload: ICreateTaxGroupRequest,
    ): Promise<ICreateTaxGroupResponse> => {
        return <ICreateTaxGroupResponse>await this.request({
            url: ROUTES.CATALOGUE.TAX_BRACKET.CREATE_GROUP,
            method: 'POST',
            payload,
        });
    };

    deleteTaxGroup = async (taxGroupId: string): Promise<IDeleteTaxGroupResponse> => {
        const param: ICommonResourcePathParam = { id: taxGroupId };
        return <IDeleteTaxGroupResponse>await this.request({
            url: ROUTES.CATALOGUE.TAX_BRACKET.DELETE_GROUP,
            method: 'DELETE',
            param,
        });
    };

    editTaxGroup = async (
        id: string,
        payload: IEditTaxGroupRequest,
    ): Promise<IEditTaxGroupResponse> => {
        const param: ICommonResourcePathParam = { id };
        return <IEditTaxGroupResponse>await this.request({
            url: ROUTES.CATALOGUE.TAX_BRACKET.EDIT_GROUP,
            method: 'PUT',
            payload,
            param,
        });
    };
}
