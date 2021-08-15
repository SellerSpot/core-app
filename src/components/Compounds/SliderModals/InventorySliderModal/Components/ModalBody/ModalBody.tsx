import { ExpandingPanels } from 'components/Compounds/SliderModals/InventorySliderModal/Components/ModalBody/Components/ExpandingPanels/ExpandingPanels';
import {
    IInventoryModalSearchFieldProps,
    InventoryModalSearchField,
} from 'components/Compounds/SliderModals/InventorySliderModal/Components/ModalBody/Components/SearchField/SearchField';
import { IInventorySliderModalProps } from 'components/Compounds/SliderModals/InventorySliderModal/InventorySliderModal.types';
import React, { ReactElement } from 'react';
import { SliderModalBody } from '@sellerspot/universal-components';
import { IOutletData } from '@sellerspot/universal-types';
import styles from './ModalBody.module.scss';

export type IModalBodyProps = {
    outletsToShow: IOutletData[];
    submitting: boolean;
} & Pick<
    IInventorySliderModalProps,
    | 'onAddProductToInventory'
    | 'onCreateProduct'
    | 'onSelectInventoryProduct'
    | 'isLoadingBody'
    | 'searchValue'
>;

export const ModalBody = (props: IModalBodyProps): ReactElement => {
    // props
    const {
        outletsToShow,
        onCreateProduct,
        onSelectInventoryProduct,
        onAddProductToInventory,
        searchValue,
    } = props;

    // component props
    const inventoryModalSearchFieldProps: IInventoryModalSearchFieldProps = {
        onAddProductToInventory,
        onSelectInventoryProduct,
        onCreateProduct,
        searchValue,
    };

    // draw
    return (
        <SliderModalBody>
            <div className={styles.modalBody}>
                <InventoryModalSearchField {...inventoryModalSearchFieldProps} />
                <ExpandingPanels outletsToShow={outletsToShow} />
            </div>
        </SliderModalBody>
    );
};
