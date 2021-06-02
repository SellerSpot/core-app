import { IBrandData } from '@sellerspot/universal-types';

// export interface ICatalogueBrandsPageState {
//     brandsData: IBrandData[];
//     brandIndexToEdit: number;
//     isLoadingBrandsTable: boolean;
//     showAddEditBrandSlider: boolean;
//     setBrandsData: (props: { brandsData: IBrandData[] }) => void;
//     addBrand: (props: { brandData: IBrandData }) => void;
//     setIsLoadingBrandsTable: (props: { isLoadingBrandsTable: boolean }) => void;
//     invokeAddBrandSlider: () => void;
//     invokeEditBrandSlider: (props: { brandIndexToEdit: number }) => void;
//     closeBrandSlider: () => void;
// }

export interface ICatalogueBrandsPageState {
    brandsData: IBrandData[];
    brandIndexToEdit: number;
    isLoadingBrandsTable: boolean;
    showAddEditBrandSlider: boolean;
}
