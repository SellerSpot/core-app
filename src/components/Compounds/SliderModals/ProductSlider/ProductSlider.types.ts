import { IconifyIcon } from '@iconify/react';
import { ISliderModalProps } from '@sellerspot/universal-components';
import { FormApi } from 'final-form';
import { IOnClickEvents } from 'typings/common.types';

interface IPrefillData {
    name: string;
    id: string;
    rate: number;
}

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
    mode: 'edit' | 'create';
    level: 1 | 2;
    prefillData?: IPrefillData;
}

export interface IProductSliderForm {
    name: string;
    rate: number;
}

export interface IProductSliderModalDynamicValues {
    sliderModalProps: Pick<ISliderModalProps, 'width' | 'type' | 'showBackdrop'>;
    closeButtonType: 'back' | 'close';
    modalTitle: string;
    modalFooterPrimaryButtonLabel: string;
    modalFooterPrimaryButtonIcon: IconifyIcon['icon'];
    initialFormValues: IProductSliderForm;
}
