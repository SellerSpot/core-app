import { IconifyIcon } from '@iconify/react';
import { ISelectOption, ISliderModalProps } from '@sellerspot/universal-components';
import { FormApi } from 'final-form';
import { TreeItem } from 'react-sortable-tree';
import { IOnClickEvents } from 'typings/common.types';
import { IBrandSliderModalProps } from '../BrandSliderModal/BrandSliderModal.types';
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
    onCreateBrand: (name: string) => void;
    onCreateStockUnit: (name: string) => void;
    onInvokeCategoryChoice: () => void;
    /** after making the choice, the user decides to cancel it in the main form */
    onCancelCategoryChoice: () => void;
    selectedCategory: TreeItem;
    treeData: TreeItem[];
    mode: 'edit' | 'create';
    level: 1 | 2;
    prefillData?: IPrefillData;
    brandSliderModalProps: IBrandSliderModalProps;
    selectCategorySliderModalProps: ISelectCategorySliderModalProps;
    stockUnitSliderModalProps: IStockUnitSliderModalProps;
}

export interface IProductSliderModalDynamicValues {
    sliderModalProps: Pick<ISliderModalProps, 'width' | 'type' | 'showBackdrop'>;
    closeButtonType: 'back' | 'close';
    modalTitle: string;
    modalFooterPrimaryButtonLabel: string;
    modalFooterPrimaryButtonIcon: IconifyIcon['icon'];
    initialFormValues: IProductSliderModalForm;
}
