import { IGetAllBrandsResponse } from '@sellerspot/universal-types';
import { IStandardDataViewTableProps } from 'components/Compounds/StandardDataViewTable/StandardDataViewTable';
import { requests } from 'requests/requests';
import { ICatalogueBrandsPageState } from './CatalogueBrandsPage.types';

export class CatalogueBrandsPageService {
    // gets all brand data to populate the table
    static getAllBrandsData = async (): Promise<IGetAllBrandsResponse['data']> => {
        const allBrandsData = await requests.catalogue.brandRequest.getAllBrands();
        return allBrandsData;
    };

    // gets table items
    static getTableItems = (
        brandsData: IGetAllBrandsResponse['data'],
        invokeEditBrandSlider: ICatalogueBrandsPageState['invokeEditBrandSlider'],
    ): IStandardDataViewTableProps['tableItems'] => {
        return brandsData.map((brand, brandIndex) => {
            const { description, name } = brand;

            const editItemCallbackHandler = () => {
                invokeEditBrandSlider({ brandIndexToEdit: brandIndex });
            };

            return {
                name,
                description,
                deleteItemCallback: null,
                editItemCallback: editItemCallbackHandler,
            };
        });
    };
}
