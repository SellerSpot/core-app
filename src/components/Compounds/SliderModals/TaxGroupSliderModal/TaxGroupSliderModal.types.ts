import { IconifyIcon } from '@iconify/react';
import { ISelectOption, ISliderModalProps } from '@sellerspot/universal-components';
import { IOnClickEvents } from 'typings/common.types';
import { ITaxBracketData } from '@sellerspot/universal-types';
import { ITaxBracketSliderModalProps } from '../TaxBracketSliderModal/TaxBracketSliderModal.types';
import { FormApi } from 'final-form';

export interface ITaxGroupSliderModalOnSubmit {
    values: ITaxGroupSliderForm;
}

export interface ITaxGroupSliderModalOnClose {
    submitting: boolean;
    dirty: boolean;
    source: 'close' | 'back' | 'button' | 'backdrop';
    event: IOnClickEvents['div'] | IOnClickEvents['button'];
}

export interface ITaxGroupSliderModalProps {
    showModal: boolean;
    formRef: React.MutableRefObject<FormApi<ITaxGroupSliderForm, Partial<ITaxGroupSliderForm>>>;
    onSubmit: (props: ITaxGroupSliderModalOnSubmit) => Promise<void>;
    onClose: (props: ITaxGroupSliderModalOnClose) => void;
    /**
     * Hook called when after a new tax bracket has been created
     */
    postTaxBracketCreation?: () => void;
    mode: 'edit' | 'create';
    level: 1 | 2;
    prefillData?: ITaxBracketData;
}

export type ITaxGroupSliderForm = Pick<ITaxBracketData, 'name'> & {
    bracket: ISelectOption<number>[];
};

export interface ITaxGroupSliderModalDynamicValues {
    sliderModalProps: Pick<ISliderModalProps, 'width' | 'type' | 'showBackdrop'>;
    closeButtonType: 'back' | 'close';
    modalTitle: string;
    modalFooterPrimaryButtonLabel: string;
    modalFooterPrimaryButtonIcon: IconifyIcon['icon'];
    initialFormValues: ITaxGroupSliderForm;
}

export interface ITaxGroupSliderModalSubSliderModalState {
    taxBracketSliderModal: Pick<ITaxBracketSliderModalProps, 'mode' | 'showModal' | 'prefillData'>;
}
