import { SliderModalBody } from '@sellerspot/universal-components';
import { InventoryModalSearchField } from 'components/Compounds/SliderModals/InventorySliderModal/Components/ModalBody/Components/InventoryModalSearchField/InventoryModalSearchField';
import { IInventorySliderModalProps } from 'components/Compounds/SliderModals/InventorySliderModal/InventorySliderModal.types';
import React, { ReactElement } from 'react';
import styles from './ModalBody.module.scss';

export type IModalBodyProps = Pick<IInventorySliderModalProps, 'prefillData'> & {
    submitting: boolean;
};

export const ModalBody = (props: IModalBodyProps): ReactElement => {
    // props
    const {} = props;

    // draw
    return (
        <SliderModalBody>
            <div className={styles.modalBody}>
                <InventoryModalSearchField />
                {/* <div className={styles.tableWrapper}>
                    <InventoryModalTable prefillData={prefillData} />
                </div>
                <InventoryModalTaxSettingSelect /> */}
            </div>
        </SliderModalBody>
    );
};
