import {
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

    createNewTaxBracket = async (
        values: ICreateTaxBracketRequest,
    ): Promise<ICreateTaxBracketResponse> => {
        return <ICreateTaxBracketResponse>await this.request({
            url: ROUTES.CATALOGUE.TAX_BRACKET.CREATE_BRACKET,
            method: 'POST',
            payload: <ICreateTaxBracketRequest>values,
        });
    };

    deleteTaxBracket = async (taxBracketId: string): Promise<IResponse> => {
        return <IDeleteTaxBracketResponse>await this.request({
            url: ROUTES.CATALOGUE.TAX_BRACKET.DELETE_BRACKET.replace(':id', taxBracketId),
            method: 'DELETE',
        });
    };

    editTaxBracket = async (data: {
        name: string;
        rate: number;
        id: string;
    }): Promise<IEditTaxBracketResponse> => {
        return <IEditTaxBracketResponse>await this.request({
            url: ROUTES.CATALOGUE.TAX_BRACKET.EDIT_BRACKET.replace(':id', data.id),
            method: 'PUT',
            payload: <IEditTaxBracketRequest>{ name: data.name },
        });
    };

    getAllTaxGroup = async (): Promise<IGetAllTaxGroupResponse> => {
        return <IGetAllTaxGroupResponse>await this.request({
            url: ROUTES.CATALOGUE.TAX_BRACKET.GET_ALL_GROUP,
            method: 'GET',
        });
    };

    createNewTaxGroup = async (
        values: ICreateTaxGroupRequest,
    ): Promise<ICreateTaxGroupResponse> => {
        return <ICreateTaxGroupResponse>await this.request({
            url: ROUTES.CATALOGUE.TAX_BRACKET.CREATE_GROUP,
            method: 'POST',
            payload: <ICreateTaxGroupRequest>values,
        });
    };

    deleteTaxGroup = async (taxGroupId: string): Promise<IDeleteTaxGroupResponse> => {
        return <IDeleteTaxGroupResponse>await this.request({
            url: ROUTES.CATALOGUE.TAX_BRACKET.DELETE_GROUP.replace(':id', taxGroupId),
            method: 'DELETE',
        });
    };

    editTaxGroup = async (data: {
        name: string;
        bracket: string[];
        id: string;
    }): Promise<IEditTaxGroupResponse> => {
        return <IEditTaxGroupResponse>await this.request({
            url: ROUTES.CATALOGUE.TAX_BRACKET.EDIT_GROUP.replace(':id', data.id),
            method: 'PUT',
            payload: <IEditTaxGroupRequest>{ name: data.name },
        });
    };
}
