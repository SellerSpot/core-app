import { State } from '@hookstate/core';
import { SliderModalBody } from '@sellerspot/universal-components';
import { ExpandingPanels } from 'components/Compounds/SliderModals/InventorySliderModal/Components/ModalBody/Components/ExpandingPanels/ExpandingPanels';
import { InventoryModalSearchField } from 'components/Compounds/SliderModals/InventorySliderModal/Components/ModalBody/Components/SearchField/SearchField';
import { IInventorySliderModalState } from 'components/Compounds/SliderModals/InventorySliderModal/InventorySliderModal';
import React, { ReactElement } from 'react';
import { IOutletData } from '@sellerspot/universal-types';
import styles from './ModalBody.module.scss';

export type IModalBodyProps = {
    state: State<IInventorySliderModalState>;
    allOutlets: IOutletData[];
    submitting: boolean;
};

export const ModalBody = (props: IModalBodyProps): ReactElement => {
    // props
    const { state, allOutlets } = props;

    // draw
    return (
        <SliderModalBody>
            <div className={styles.modalBody}>
                <InventoryModalSearchField selectedProductState={state.selectedProduct} />
                <ExpandingPanels allOutlets={allOutlets} />
            </div>
        </SliderModalBody>
    );
};
