import { IGetAllBrandsResponse } from '@sellerspot/universal-types';

export interface ICatalogueBrandsPageState {
    brandsData: IGetAllBrandsResponse['data'];
    isLoadingBrandsTable: boolean;
    showAddEditBrandSlider: boolean;
    setBrandsData: (data: IGetAllBrandsResponse['data']) => void;
    setIsLoadingBrandsTable: (data: boolean) => void;
    invokeAddBrandSlider: () => void;
}
