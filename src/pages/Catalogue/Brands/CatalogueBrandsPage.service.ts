import { IGetAllBrandResponse } from '@sellerspot/universal-types';
import { requests } from 'requests/requests';
import { ICatalogueBrandsPageState } from './CatalogueBrandsPage.types';

export class CatalogueBrandsPageService {
    // gets the initial data for page state
    static pageStateInitialData: ICatalogueBrandsPageState = {
        brandsData: [],
        brandIndexToEdit: null,
        isLoadingBrandsTable: true,
        showAddEditBrandSlider: false,
    };

    // gets all brand data to populate the table
    static getAllBrand = async (): Promise<IGetAllBrandResponse['data']> => {
        const listBrandData = await requests.catalogue.brandRequest.getAllBrand();
        return listBrandData.data;
    };
}
