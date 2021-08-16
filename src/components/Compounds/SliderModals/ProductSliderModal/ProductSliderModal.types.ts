import { ISelectOption } from '@sellerspot/universal-components';
import { IBrandSliderModalProps } from 'components/Compounds/SliderModals/BrandSliderModal/BrandSliderModal.types';
import { FormApi } from 'final-form';
import { TreeItem } from 'react-sortable-tree';
import { IOnClickEvents } from 'typings/common.types';
import { ISelectCategorySliderModalProps } from '../SelectCategorySliderModal/SelectCategorySliderModal.types';
import { IStockUnitSliderModalProps } from '../StockUnitSliderModal/StockUnitSliderModal.types';

export interface IProductSliderModalForm {
    name: string;
    barcode?: string;
    description?: string;
    brand?: ISelectOption;
    category?: string;
    stockUnit?: ISelectOption;
}

type IPrefillData = IProductSliderModalForm & {
    id: string;
};

export interface IProductSliderModalOnSubmit {
    values: IProductSliderModalForm;
}

export interface IProductSliderModalOnClose {
    submitting: boolean;
    dirty: boolean;
    source: 'close' | 'back' | 'button' | 'backdrop';
    event: IOnClickEvents['div'] | IOnClickEvents['button'];
}

export interface IProductSliderModalProps {
    showModal: boolean;
    formRef: React.MutableRefObject<
        FormApi<IProductSliderModalForm, Partial<IProductSliderModalForm>>
    >;
    onSubmit: (props: IProductSliderModalOnSubmit) => Promise<void>;
    onClose: (props: IProductSliderModalOnClose) => void;
    onInvokeCategoryChoice: () => void;
    /** after making the choice, the user decides to cancel it in the main form */
    onCancelCategoryChoice: () => void;
    selectedCategory: TreeItem;
    treeData: TreeItem[];
    mode: 'edit' | 'create';
    level: 1 | 2;
    prefillData?: IPrefillData;
    selectCategorySliderModalProps: ISelectCategorySliderModalProps;
}

export interface IProductSliderModalSubSliderModalState {
    brandSliderModal: Pick<IBrandSliderModalProps, 'showModal' | 'mode' | 'prefillData'>;
    stockUnitSliderModal: Pick<IStockUnitSliderModalProps, 'showModal' | 'mode' | 'prefillData'>;
}
