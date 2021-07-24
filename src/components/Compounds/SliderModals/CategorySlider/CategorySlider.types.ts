import { IconifyIcon } from '@iconify/react';
import { ISliderModalProps } from '@sellerspot/universal-components';
import { FormApi } from 'final-form';
import { IOnClickEvents } from 'typings/common.types';

interface IPrefillData {
    name: string;
    id: string;
}

interface IContextData {
    categoryId: string;
}

export interface ICategorySliderModalOnSubmit {
    values: ICategorySliderForm;
}

export interface ICategorySliderModalOnClose {
    submitting: boolean;
    dirty: boolean;
    source: 'close' | 'back' | 'button' | 'backdrop';
    event: IOnClickEvents['div'] | IOnClickEvents['button'];
}

export interface ICategorySliderProps {
    showModal: boolean;
    formRef: React.MutableRefObject<FormApi<ICategorySliderForm, Partial<ICategorySliderForm>>>;
    onSubmit: (props: ICategorySliderModalOnSubmit) => Promise<void>;
    onClose: (props: ICategorySliderModalOnClose) => void;
    mode: 'edit' | 'create';
    level: 1 | 2;
    prefillData?: IPrefillData;
    /**
     * Used to indicate the current category in focus (for onCreate and onEdit)
     */
    contextData?: IContextData;
}

export interface ICategorySliderForm {
    name: string;
}

export interface ICategorySliderModalDynamicValues {
    sliderModalProps: Pick<ISliderModalProps, 'width' | 'type' | 'showBackdrop'>;
    closeButtonType: 'back' | 'close';
    modalTitle: string;
    modalFooterPrimaryButtonLabel: string;
    modalFooterPrimaryButtonIcon: IconifyIcon['icon'];
    initialFormValues: ICategorySliderForm;
}
