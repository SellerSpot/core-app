import {
    ICreateTaxBracketRequest,
    ICreateTaxBracketResponse,
    ICreateTaxGroupRequest,
    ICreateTaxGroupResponse,
    IEditTaxBracketResponse,
    IEditTaxGroupResponse,
    IGetAllTaxBracketResponse,
    IGetAllTaxGroupResponse,
    IResponse,
} from '@sellerspot/universal-types';
import BaseRequest from 'requests/BaseRequest';
import { accessCatalogueServer } from './Server';

export default class TaxSettingsRequest extends BaseRequest {
    constructor() {
        super('CATALOGUE');
    }

    getAllTaxBracket = async (): Promise<IGetAllTaxBracketResponse> => {
        return await accessCatalogueServer().getAllTaxBracket();
    };

    createNewTaxBracket = async (
        values: ICreateTaxBracketRequest,
    ): Promise<ICreateTaxBracketResponse> => {
        return await accessCatalogueServer().createNewTaxBracket(values);
    };

    deleteTaxBracket = async (TaxBracketId: string): Promise<IResponse> => {
        return await accessCatalogueServer().deleteTaxBracket(TaxBracketId);
    };

    editTaxBracket = async (data: {
        name: string;
        rate: number;
        id: string;
    }): Promise<IEditTaxBracketResponse> => {
        return await accessCatalogueServer().editTaxBracket(data);
    };

    getAllTaxGroup = async (): Promise<IGetAllTaxGroupResponse> => {
        return await accessCatalogueServer().getAllTaxGroup();
    };

    createNewTaxGroup = async (
        values: ICreateTaxGroupRequest,
    ): Promise<ICreateTaxGroupResponse> => {
        return await accessCatalogueServer().createNewTaxGroup(values);
    };

    deleteTaxGroup = async (taxGroupId: string): Promise<IResponse> => {
        return await accessCatalogueServer().deleteTaxGroup(taxGroupId);
    };

    editTaxGroup = async (data: {
        name: string;
        bracket: string[];
        id: string;
    }): Promise<IEditTaxGroupResponse> => {
        return await accessCatalogueServer().editTaxGroup(data);
    };
}
