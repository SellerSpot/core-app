import React, { ReactElement } from 'react';
import styles from './ModalBody.module.scss';
import { SliderModalBody } from '../../../../../../../.yalc/@sellerspot/universal-components/dist';

export interface IModalBodyProps {
    submitting: boolean;
}

export const ModalBody = (props: IModalBodyProps): ReactElement => {
    // props
    const {} = props;

    // draw
    return (
        <SliderModalBody>
            <div className={styles.modalBody}></div>
        </SliderModalBody>
    );
};
