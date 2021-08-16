import { ISliderModalProps } from '@sellerspot/universal-components/dist';
import { IOnClickEvents } from 'typings/common.types';
import { ICategorySliderModalProps } from '../CategorySliderModal/CategorySliderModal.types';

export interface ISelectCategorySliderModalOnClose {
    source: 'close' | 'back' | 'button' | 'backdrop';
    event: IOnClickEvents['div'] | IOnClickEvents['button'];
}

export interface ISelectCategorySliderModalProps {
    showModal: boolean;
    onClose: (props: ISelectCategorySliderModalOnClose) => void;
    level: 1 | 2;
    onSubmit: () => void;
    onSearch: (query: string) => void;
}

export type ISelectCategorySliderModalDynamicProps = Pick<ISliderModalProps, 'type' | 'width'> & {
    closeButtonType: 'back' | 'close';
};

export interface ISelectCategorySubSliderModalState {
    categorySliderModal: Pick<
        ICategorySliderModalProps,
        'showModal' | 'contextData' | 'prefillData' | 'mode'
    >;
}
