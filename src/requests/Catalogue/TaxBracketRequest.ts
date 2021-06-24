import BaseRequest from 'requests/BaseRequest';
import {
    ICreateTaxBracketRequest,
    ICreateTaxBracketResponse,
    IDeleteTaxBracketResponse,
    IEditTaxBracketResponse,
    IGetAllTaxBracketResponse,
} from '@sellerspot/universal-types';
import { accessCatalogueServer } from './Server';

export default class TaxBracketRequest extends BaseRequest {
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

    deleteTaxBracket = async (TaxBracketId: string): Promise<IDeleteTaxBracketResponse> => {
        return await accessCatalogueServer().deleteTaxBracket(TaxBracketId);
    };

    editTaxBracket = async (data: {
        name: string;
        rate: number;
        id: string;
    }): Promise<IEditTaxBracketResponse> => {
        return await accessCatalogueServer().editTaxBracket(data);
    };
}
