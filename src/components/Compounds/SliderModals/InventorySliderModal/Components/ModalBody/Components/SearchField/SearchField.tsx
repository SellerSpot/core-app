import { State, useState } from '@hookstate/core';
import {
    AsyncCreatableSelect,
    IAsyncCreatableSelectProps,
    ISelectOption,
} from '@sellerspot/universal-components';
import { InventoryModalSearchFieldService } from 'components/Compounds/SliderModals/InventorySliderModal/Components/ModalBody/Components/SearchField/SearchField.service';
import { IInventorySliderModalLocalState } from 'components/Compounds/SliderModals/InventorySliderModal/InventorySliderModal';
import React, { ReactElement } from 'react';
import styles from './SearchField.module.scss';

interface IInventoryModalSearchFieldProps {
    selectedProductState: State<IInventorySliderModalLocalState['selectedProduct']>;
}

export const InventoryModalSearchField = (props: IInventoryModalSearchFieldProps): ReactElement => {
    // props
    const {} = props;
    // state
    // should the creatable prompt be "create new product"
    // or "add product to inventory"
    const creatableActionType = useState<'createProduct' | 'addToInventory' | null>(null);
    // handlers
    const loadOptionsHandler: IAsyncCreatableSelectProps['loadOptions'] = async (query) => {
        // sending request
        const searchResults = await InventoryModalSearchFieldService.searchInventory({ query });

        if (searchResults.searchStatus) {
            return InventoryModalSearchFieldService.convertSearchResultToISelect(
                searchResults.products,
            );
        } else {
            return InventoryModalSearchFieldService.convertSearchResultToISelect(
                searchResults.products,
            );
        }
    };
    const onChangeHandler: IAsyncCreatableSelectProps['onChange'] = (option) => {
        console.log((option as ISelectOption).label);
    };
    const onCreateOptionHandler: IAsyncCreatableSelectProps['onCreateOption'] = (option) => {
        if (creatableActionType.get() === 'createProduct') {
            console.log('Create Product ', option);
        } else if (creatableActionType.get() === 'addToInventory') {
            console.log('Add Product to inventory ', option);
        }
    };
    const formatCreateLabelHandler: IAsyncCreatableSelectProps['formatCreateLabel'] = (
        inputValue,
    ) => {
        return `Create product "${inputValue}"`;
    };

    // draw
    return (
        <div className={styles.wrapper}>
            <AsyncCreatableSelect
                autoFocus
                label="Search for Products"
                loadOptions={loadOptionsHandler}
                formatCreateLabel={formatCreateLabelHandler}
                onCreateOption={onCreateOptionHandler}
                onChange={onChangeHandler}
            />
        </div>
    );
};
