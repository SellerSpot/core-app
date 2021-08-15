import { SliderModalBody } from '@sellerspot/universal-components';
import { IOutletData } from '@sellerspot/universal-types';
import { ExpandingPanels } from 'components/Compounds/SliderModals/InventorySliderModal/Components/ModalBody/Components/ExpandingPanels/ExpandingPanels';
import { InventoryModalSearchField } from 'components/Compounds/SliderModals/InventorySliderModal/Components/ModalBody/Components/SearchField/SearchField';
import { IInventorySliderModalDynamicValues } from 'components/Compounds/SliderModals/InventorySliderModal/InventorySliderModal.service';
import React, { ReactElement } from 'react';
import styles from './ModalBody.module.scss';

export type IModalBodyProps = {
    outletsToShow: IOutletData[];
    submitting: boolean;
    searchFieldProps: IInventorySliderModalDynamicValues['searchField'];
};

export const ModalBody = (props: IModalBodyProps): ReactElement => {
    // props
    const { outletsToShow, searchFieldProps } = props;

    // draw
    return (
        <SliderModalBody>
            <div className={styles.modalBody}>
                <InventoryModalSearchField searchFieldProps={searchFieldProps} />
                <ExpandingPanels outletsToShow={outletsToShow} />
            </div>
        </SliderModalBody>
    );
};
