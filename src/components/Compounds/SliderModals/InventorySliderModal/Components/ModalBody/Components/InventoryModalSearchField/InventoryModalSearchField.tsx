import { AsyncCreatableSelect, IAsyncCreatableSelectProps } from '@sellerspot/universal-components';
import { InventoryModalSearchFieldService } from 'components/Compounds/SliderModals/InventorySliderModal/Components/ModalBody/Components/InventoryModalSearchField/InventoryModalSearchField.service';
import React, { ReactElement } from 'react';
import styles from './InventoryModalSearchField.module.scss';

export const InventoryModalSearchField = (): ReactElement => {
    // handlers
    const loadOptionsHandler: IAsyncCreatableSelectProps['loadOptions'] = async (query) => {
        // sending request
        const options = await InventoryModalSearchFieldService.searchInventory({ query });
        return options;
    };

    // draw
    return (
        <div className={styles.wrapper}>
            <AsyncCreatableSelect
                label="Search for Products"
                autoFocus
                loadOptions={loadOptionsHandler}
            />
        </div>
    );
};
