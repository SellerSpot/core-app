import { IGetAllBrandsResponse } from '@sellerspot/universal-types';

export interface ICatalogueBrandsPageState {
    brandsData: IGetAllBrandsResponse['data'];
    brandIndexToEdit: number;
    isLoadingBrandsTable: boolean;
    showAddEditBrandSlider: boolean;
    setBrandsData: (props: { brandsData: IGetAllBrandsResponse['data'] }) => void;
    setIsLoadingBrandsTable: (props: { isLoadingBrandsTable: boolean }) => void;
    invokeAddBrandSlider: () => void;
    invokeEditBrandSlider: (props: { brandIndexToEdit: number }) => void;
    closeBrandSlider: () => void;
}
