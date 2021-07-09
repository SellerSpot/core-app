import { IconifyIcon } from '@iconify/react';
import { ISelectOption, ISliderModalProps } from '@sellerspot/universal-components';
import { IOnClickEvents } from 'typings/common.types';
import { ITaxBracketData, ITaxGroupData } from '@sellerspot/universal-types';
import { ITaxBracketSliderProps } from '../TaxBracketSlider/TaxBracketSlider.types';

export interface ITaxGroupSliderModalOnSubmit {
    values: ITaxGroupSliderForm;
}

export interface ITaxGroupSliderModalOnClose {
    submitting: boolean;
    dirty: boolean;
    source: 'close' | 'back' | 'button' | 'backdrop';
    event: IOnClickEvents['div'] | IOnClickEvents['button'];
}

export interface ITaxGroupSliderProps {
    showModal: boolean;
    isPageOnStandby: boolean;
    onSubmit: (props: ITaxGroupSliderModalOnSubmit) => Promise<void>;
    onClose: (props: ITaxGroupSliderModalOnClose) => void;
    onCreateTaxSetting: (value: string) => void;
    mode: 'edit' | 'create';
    level: 1 | 2;
    allTaxBrackets: ITaxBracketData[];
    taxBracketSliderProps?: ITaxBracketSliderProps;
    prefillData?: ITaxGroupData;
}

export type ITaxGroupSliderForm = Pick<ITaxGroupData, 'name'> & { bracket: ISelectOption[] };

export interface ITaxGroupSliderModalDynamicValues {
    sliderModalProps: Pick<ISliderModalProps, 'width' | 'type' | 'showBackdrop'>;
    closeButtonType: 'back' | 'close';
    modalTitle: string;
    modalFooterPrimaryButtonLabel: string;
    modalFooterPrimaryButtonIcon: IconifyIcon['icon'];
    initialFormValues: ITaxGroupSliderForm;
}
