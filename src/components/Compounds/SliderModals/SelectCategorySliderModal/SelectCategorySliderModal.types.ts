import { ICategoryViewProps } from 'components/Compounds/CategoryView/CategoryView.types';
import { IOnClickEvents } from 'typings/common.types';
import { ISliderModalProps } from '../../../../../.yalc/@sellerspot/universal-components/dist';
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
    categoryViewProps: ICategoryViewProps;
    categorySliderModalProps: ICategorySliderModalProps;
}

export type ISelectCategorySliderModalDynamicProps = Pick<ISliderModalProps, 'type' | 'width'> & {
    closeButtonType: 'back' | 'close';
};
