import { useState } from '@hookstate/core';
import {
    AsyncCreatableSelect,
    IAsyncCreatableSelectProps,
    ISelectOption,
} from '@sellerspot/universal-components';
import { InventoryModalSearchFieldService } from 'components/Compounds/SliderModals/InventorySliderModal/Components/ModalBody/Components/SearchField/SearchField.service';
import { IInventorySliderModalDynamicValues } from 'components/Compounds/SliderModals/InventorySliderModal/InventorySliderModal.service';
import React, { ReactElement } from 'react';
import styles from './SearchField.module.scss';

interface IInventoryModalSearchFieldProps {
    searchFieldProps: IInventorySliderModalDynamicValues['searchField'];
}

type ISelectMeta = IInventorySliderModalDynamicValues['searchField']['selectedProduct']['meta'];

export const InventoryModalSearchField = (props: IInventoryModalSearchFieldProps): ReactElement => {
    // props
    const { searchFieldProps } = props;
    // state
    const selectedOption = useState<ISelectOption<ISelectMeta>>(searchFieldProps.selectedProduct);
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
        const currentOption = option as ISelectOption<ISelectMeta>;
        if (currentOption.meta.type === 'inventoryProduct') {
        } else if (currentOption.meta.type === 'catalogueProduct') {
            console.log('Add A Product to inventory');
        }
    };
    const onCreateOptionHandler: IAsyncCreatableSelectProps['onCreateOption'] = (option) => {
        console.log('Create Product ', option);
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
                isDisabled={searchFieldProps.disabled}
                label="Search for Products"
                loadOptions={loadOptionsHandler}
                value={selectedOption.get()}
                formatCreateLabel={formatCreateLabelHandler}
                onCreateOption={onCreateOptionHandler}
                onChange={onChangeHandler}
            />
        </div>
    );
};
