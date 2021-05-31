import { IGetAllBrandsResponse } from '@sellerspot/universal-types';
import { IStandardDataViewTableProps } from 'components/Compounds/StandardDataViewTable/StandardDataViewTable';
import { requests } from 'requests/requests';

export class CatalogueBrandsPageService {
    // gets all brand data to populate the table
    static getAllBrandsData = async (): Promise<IGetAllBrandsResponse['data']> => {
        const allBrandsData = await requests.catalogue.brandRequest.getAllBrands();
        return allBrandsData;
    };

    // gets table items
    static getTableItems = (
        brandsData: IGetAllBrandsResponse['data'],
    ): IStandardDataViewTableProps['tableItems'] => {
        return brandsData.map((brand) => {
            const { description, name } = brand;

            return {
                name,
                description,
            };
        });
    };
}
