import { State } from '@hookstate/core';
import {
    AsyncCreatableSelect,
    IAsyncCreatableSelectProps,
    ISelectOption,
} from '@sellerspot/universal-components';
import { InventoryModalSearchFieldService } from 'components/Compounds/SliderModals/InventorySliderModal/Components/ModalBody/Components/InventoryModalSearchField/InventoryModalSearchField.service';
import { IInventorySliderModalLocalState } from 'components/Compounds/SliderModals/InventorySliderModal/InventorySliderModal';
import React, { ReactElement } from 'react';
import styles from './InventoryModalSearchField.module.scss';

interface IInventoryModalSearchFieldProps {
    selectedProductState: State<IInventorySliderModalLocalState['selectedProduct']>;
}

export const InventoryModalSearchField = (props: IInventoryModalSearchFieldProps): ReactElement => {
    // props
    const { selectedProductState } = props;
    // handlers
    const loadOptionsHandler: IAsyncCreatableSelectProps['loadOptions'] = async (query) => {
        // sending request
        const options = await InventoryModalSearchFieldService.searchInventory({ query });
        return options;
    };
    const onChangeHandler: IAsyncCreatableSelectProps['onChange'] = (option) => {
        selectedProductState.set((option as ISelectOption).value);
    };

    // draw
    return (
        <div className={styles.wrapper}>
            <AsyncCreatableSelect
                label="Search for Products"
                autoFocus
                loadOptions={loadOptionsHandler}
                onChange={onChangeHandler}
            />
        </div>
    );
};
