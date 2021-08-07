import React, { ReactElement } from 'react';
import styles from './ModalBody.module.scss';
import { SliderModalBody } from '@sellerspot/universal-components';
import { InventoryModalTable } from 'components/Compounds/SliderModals/InventorySliderModal/Components/ModalBody/Components/InventoryModalTable/InventoryModalTable';
import { useState } from '@hookstate/core';
import { InventoryModalSearchField } from 'components/Compounds/SliderModals/InventorySliderModal/Components/ModalBody/Components/InventoryModalSearchField/InventoryModalSearchField';
import { IInventoryData } from '@sellerspot/universal-types';
import { InventoryModalTaxSettingSelect } from './Components/InventoryModalTaxSettingSelect/InventoryModalTaxSettingSelect';

export interface IModalBodyProps {
    submitting: boolean;
}

export const ModalBody = (props: IModalBodyProps): ReactElement => {
    // props
    const {} = props;

    const sampleInventoryData: IInventoryData[] = [
        {
            stock: 12,
            outlet: {
                address: 'asdfasd',
                id: 'sdafasdfasd',
                name: 'Samplele',
            },
            isActive: false,
            isTrack: false,
            product: null,
            sellingPrice: 0,
            landingCost: 9,
            markup: 0,
            mrp: 100,
        },
    ];

    const sampleState = useState({
        inventory: sampleInventoryData,
    });

    // draw
    return (
        <SliderModalBody>
            <div className={styles.modalBody}>
                <InventoryModalSearchField />
                <div className={styles.tableWrapper}>
                    <InventoryModalTable inventoryData={sampleState.inventory} />
                </div>
                <InventoryModalTaxSettingSelect />
            </div>
        </SliderModalBody>
    );
};
