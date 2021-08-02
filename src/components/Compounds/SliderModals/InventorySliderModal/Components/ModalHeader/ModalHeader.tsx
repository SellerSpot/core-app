import React, { ReactElement } from 'react';
import { SliderModalHeader } from '../../../../../../../.yalc/@sellerspot/universal-components/dist';

interface IModalHeaderProps {
    sample: string;
}

export const ModalHeader = (props: IModalHeaderProps): ReactElement => {
    // props
    const {} = props;

    // draw
    return <SliderModalHeader title="Hi there" />;
};
