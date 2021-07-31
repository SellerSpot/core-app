import { IconifyIcon } from '@iconify/react';
import { ISliderModalProps } from '@sellerspot/universal-components';
import { FormApi } from 'final-form';
import { IOnClickEvents } from 'typings/common.types';

interface IPrefillData {
    name: string;
    id?: string;
}

export interface IBrandSliderModalOnSubmit {
    values: IBrandSliderForm;
}

export interface IBrandSliderModalOnClose {
    submitting: boolean;
    dirty: boolean;
    source: 'close' | 'back' | 'button' | 'backdrop';
    event: IOnClickEvents['div'] | IOnClickEvents['button'];
}

export interface IBrandSliderModalProps {
    showModal: boolean;
    formRef: React.MutableRefObject<FormApi<IBrandSliderForm, Partial<IBrandSliderForm>>>;
    onSubmit: (props: IBrandSliderModalOnSubmit) => Promise<void>;
    onClose: (props: IBrandSliderModalOnClose) => void;
    mode: 'edit' | 'create';
    level: 1 | 2;
    prefillData?: IPrefillData;
}

export interface IBrandSliderForm {
    name: string;
}

export interface IBrandSliderModalDynamicValues {
    sliderModalProps: Pick<ISliderModalProps, 'width' | 'type' | 'showBackdrop'>;
    closeButtonType: 'back' | 'close';
    modalTitle: string;
    modalFooterPrimaryButtonLabel: string;
    modalFooterPrimaryButtonIcon: IconifyIcon['icon'];
    initialFormValues: IBrandSliderForm;
}
