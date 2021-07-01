import { IconifyIcon } from '@iconify/react';
import { ISliderModalProps } from '@sellerspot/universal-components';
import { IOnClickEvents } from 'typings/common.types';

interface IPrefillData {
    name: string;
    id: string;
    rate: number;
}

export interface ITaxBracketSliderModalOnSubmit {
    values: ITaxBracketSliderForm;
}

export interface ITaxBracketSliderModalOnClose {
    submitting: boolean;
    dirty: boolean;
    source: 'close' | 'back' | 'button' | 'backdrop';
    event: IOnClickEvents['div'] | IOnClickEvents['button'];
}

type TMode = 'edit' | 'create';

export interface ITaxBracketSliderProps {
    showModal: boolean;
    onSubmit: (props: ITaxBracketSliderModalOnSubmit) => void;
    onClose: (props: ITaxBracketSliderModalOnClose) => void;
    mode: TMode;
    level: 1 | 2;
    prefillData?: IPrefillData;
}

export interface ITaxBracketSliderForm {
    name: string;
    rate: number;
}

export interface ITaxBracketSliderModalDynamicValues {
    sliderModalProps: Pick<ISliderModalProps, 'width' | 'type' | 'showBackdrop'>;
    closeButtonType: 'back' | 'close';
    modalTitle: string;
    modalFooterPrimaryButtonLabel: string;
    modalFooterPrimaryButtonIcon: IconifyIcon['icon'];
    initialFormValues: ITaxBracketSliderForm;
}
