import { IconifyIcon } from '@iconify/react';
import { ISelectOption, ISliderModalProps } from '@sellerspot/universal-components';
import { FormApi } from 'final-form';
import { IOnClickEvents } from 'typings/common.types';
import { IBrandSliderProps } from '../BrandSlider/BrandSlider.types';
import { ICategorySliderProps } from '../CategorySlider/CategorySlider.types';
import { IStockUnitSliderProps } from '../StockUnitSlider/StockUnitSlider.types';
import { ITaxBracketSliderProps } from '../TaxBracketSlider/TaxBracketSlider.types';
import { ITaxGroupSliderProps } from '../TaxGroupSlider/TaxGroupSlider.types';

export interface IProductSliderForm {
    name: string;
    barcode: string;
    description: string;
    brand: ISelectOption;
    category: string;
    stockUnit: ISelectOption;
}

type IPrefillData = IProductSliderForm & {
    id: string;
};

export interface IProductSliderModalOnSubmit {
    values: IProductSliderForm;
}

export interface IProductSliderModalOnClose {
    submitting: boolean;
    dirty: boolean;
    source: 'close' | 'back' | 'button' | 'backdrop';
    event: IOnClickEvents['div'] | IOnClickEvents['button'];
}

export interface IProductSliderProps {
    showModal: boolean;
    formRef: React.MutableRefObject<FormApi<IProductSliderForm, Partial<IProductSliderForm>>>;
    onSubmit: (props: IProductSliderModalOnSubmit) => Promise<void>;
    onClose: (props: IProductSliderModalOnClose) => void;
    onCreateBrand: (name: string) => void;
    onCreateStockUnit: (name: string) => void;
    onInvokeCategoryChoice: () => void;
    mode: 'edit' | 'create';
    level: 1 | 2;
    prefillData?: IPrefillData;
    brandSliderProps: IBrandSliderProps;
    categorySliderProps: ICategorySliderProps;
    stockUnitSliderProps: IStockUnitSliderProps;
    taxBracketSliderProps: ITaxBracketSliderProps;
    taxGroupSliderProps: ITaxGroupSliderProps;
}

export interface IProductSliderModalDynamicValues {
    sliderModalProps: Pick<ISliderModalProps, 'width' | 'type' | 'showBackdrop'>;
    closeButtonType: 'back' | 'close';
    modalTitle: string;
    modalFooterPrimaryButtonLabel: string;
    modalFooterPrimaryButtonIcon: IconifyIcon['icon'];
    initialFormValues: IProductSliderForm;
}
