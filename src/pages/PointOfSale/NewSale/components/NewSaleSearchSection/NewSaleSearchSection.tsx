import { State, useState } from '@hookstate/core';
import React, { ReactElement } from 'react';
import { ICONS } from 'utilities/utilities';
import { Button, IInputFieldProps, InputField } from '@sellerspot/universal-components';
import { IProductData, ISaleData } from '@sellerspot/universal-types';
import styles from './NewSaleSearchSection.module.scss';
import Icon from '@iconify/react';
import SaleSearchResultCard from './components/SaleSearchResultCard/SaleSearchResultCard';

interface INewSaleSearchSectionProps {
    saleData: State<ISaleData>;
}

export const NewSaleSearchSection = (props: INewSaleSearchSectionProps): ReactElement => {
    // props
    const {} = props;

    // state
    const searchQuery = useState('');
    const searchResult = useState<IProductData[]>([]);

    // handlers
    const onSearchInitaiteClickHandler = () => {
        // search logic
    };

    const searchFieldOnChangeHandler: IInputFieldProps['onChange'] = (event) => {
        searchQuery.set(event.target.value);
    };

    return (
        <div className={styles.searchSectionWrapper}>
            <InputField
                autoFocus={true}
                label="Search for producst"
                placeHolder="Start typing or scaning"
                theme="primary"
                size="medium"
                fullWidth={true}
                disableHelperTextPlaceholderPadding={true}
                suffix={<Icon icon={ICONS.outlineSearch} />}
                onChange={searchFieldOnChangeHandler}
            />
            {/* search initiate info block */}
            {searchQuery.get().length === 0 && searchResult.get().length === 0 && (
                <div className={styles.searchInitiateInfoHolder}>
                    <Icon
                        icon={ICONS.outlineSearch}
                        className={styles.searchInitiateSearchIconHolder}
                    />
                    <h5>Search / scan for products</h5>
                    <Button
                        label="Search"
                        theme="light"
                        size="large"
                        variant="contained"
                        onClick={onSearchInitaiteClickHandler}
                    />
                </div>
            )}
            {/* search results block */}
            {searchResult.get().length > 0 && (
                <div className={styles.searchResultSecitonWrapper}>
                    <SaleSearchResultCard
                        productImage={undefined}
                        productName={'Tomato'}
                        stockUnit={'kg'}
                        unitPrice={20}
                    />
                    <SaleSearchResultCard
                        productImage={undefined}
                        productName={'Tomato'}
                        stockUnit={'kg'}
                        unitPrice={20}
                    />
                </div>
            )}
        </div>
    );
};
