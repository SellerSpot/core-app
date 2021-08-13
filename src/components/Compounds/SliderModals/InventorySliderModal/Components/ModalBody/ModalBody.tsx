import { State } from '@hookstate/core';
import { SliderModalBody } from '@sellerspot/universal-components';
import { ExpandingPanels } from 'components/Compounds/SliderModals/InventorySliderModal/Components/ModalBody/Components/ExpandingPanels/ExpandingPanels';
import { InventoryModalSearchField } from 'components/Compounds/SliderModals/InventorySliderModal/Components/ModalBody/Components/SearchField/SearchField';
import { IInventorySliderModalLocalState } from 'components/Compounds/SliderModals/InventorySliderModal/InventorySliderModal';
import React, { ReactElement } from 'react';
import styles from './ModalBody.module.scss';

export type IModalBodyProps = {
    submitting: boolean;
    localState: State<IInventorySliderModalLocalState>;
};

export const ModalBody = (props: IModalBodyProps): ReactElement => {
    // props
    const { localState } = props;

    // draw
    return (
        <SliderModalBody>
            <div className={styles.modalBody}>
                <InventoryModalSearchField selectedProductState={localState.selectedProduct} />
                <ExpandingPanels allOutlets={localState.dynamicProps.allOutlets.get()} />
            </div>
        </SliderModalBody>
    );
};
