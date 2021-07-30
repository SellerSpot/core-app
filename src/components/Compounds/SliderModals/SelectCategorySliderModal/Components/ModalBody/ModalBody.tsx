import { CategoryView } from 'components/Compounds/CategoryView/CategoryView';
import React, { ReactElement } from 'react';
import { SliderModalBody } from '../../../../../../../.yalc/@sellerspot/universal-components/dist';
import { ISelectCategorySliderModalProps } from '../../SelectCategorySliderModal.types';

interface IModalBodyProps {
    categoryViewProps: ISelectCategorySliderModalProps['categoryViewProps'];
}

export const ModalBody = (props: IModalBodyProps): ReactElement => {
    // props
    const { categoryViewProps } = props;

    // draw
    return (
        <SliderModalBody>
            <CategoryView {...categoryViewProps} />
        </SliderModalBody>
    );
};
