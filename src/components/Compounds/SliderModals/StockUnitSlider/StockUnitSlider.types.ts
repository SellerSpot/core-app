import { IconifyIcon } from '@iconify/react';
import { ISliderModalProps } from '@sellerspot/universal-components';
import { FormApi } from 'final-form';
import { IOnClickEvents } from 'typings/common.types';

interface IPrefillData {
    name: string;
    id: string;
    rate: number;
}

export interface IStockUnitSliderModalOnSubmit {
    values: IStockUnitSliderForm;
}

export interface IStockUnitSliderModalOnClose {
    submitting: boolean;
    dirty: boolean;
    source: 'close' | 'back' | 'button' | 'backdrop';
    event: IOnClickEvents['div'] | IOnClickEvents['button'];
}

export interface IStockUnitSliderProps {
    showModal: boolean;
    formRef: React.MutableRefObject<FormApi<IStockUnitSliderForm, Partial<IStockUnitSliderForm>>>;
    onSubmit: (props: IStockUnitSliderModalOnSubmit) => Promise<void>;
    onClose: (props: IStockUnitSliderModalOnClose) => void;
    mode: 'edit' | 'create';
    level: 1 | 2;
    prefillData?: IPrefillData;
}

export interface IStockUnitSliderForm {
    name: string;
}

export interface IStockUnitSliderModalDynamicValues {
    sliderModalProps: Pick<ISliderModalProps, 'width' | 'type' | 'showBackdrop'>;
    closeButtonType: 'back' | 'close';
    modalTitle: string;
    modalFooterPrimaryButtonLabel: string;
    modalFooterPrimaryButtonIcon: IconifyIcon['icon'];
    initialFormValues: IStockUnitSliderForm;
}
