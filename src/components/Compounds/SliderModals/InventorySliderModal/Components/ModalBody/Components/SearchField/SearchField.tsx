import {
    AsyncCreatableSelect,
    IAsyncCreatableSelectProps,
    ISelectOption,
} from '@sellerspot/universal-components';
import { InventoryModalSearchFieldService } from 'components/Compounds/SliderModals/InventorySliderModal/Components/ModalBody/Components/SearchField/SearchField.service';
import {
    IInventorySubSliderHandlers,
    ISearchInventorySelectMeta,
} from 'components/Compounds/SliderModals/InventorySliderModal/InventorySliderModal.types';
import React, { ReactElement } from 'react';
import styles from './SearchField.module.scss';

export type IInventoryModalSearchFieldProps = Pick<
    IInventorySubSliderHandlers,
    'onAddProductToInventory' | 'onCreateProduct' | 'onSelectInventoryProduct'
> & {
    searchOption: ISelectOption;
};

export const InventoryModalSearchField = (props: IInventoryModalSearchFieldProps): ReactElement => {
    // props
    const { onAddProductToInventory, onCreateProduct, onSelectInventoryProduct, searchOption } =
        props;
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
        const currentOption = option as ISelectOption<ISearchInventorySelectMeta>;
        if (currentOption.meta.type === 'inventoryProduct') {
            onSelectInventoryProduct(currentOption);
        } else if (currentOption.meta.type === 'catalogueProduct') {
            onAddProductToInventory(currentOption);
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
                value={searchOption}
                formatCreateLabel={formatCreateLabelHandler}
                onCreateOption={onCreateProduct}
                onChange={onChangeHandler}
            />
        </div>
    );
};
