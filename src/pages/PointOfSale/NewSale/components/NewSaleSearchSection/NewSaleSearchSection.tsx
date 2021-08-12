import { State, useState } from '@hookstate/core';
import React, { ReactElement, useRef } from 'react';
import { ICONS } from 'utilities/utilities';
import { Button, IInputFieldProps, InputField, Skeleton } from '@sellerspot/universal-components';
import { IProductData, ISaleData } from '@sellerspot/universal-types';
import styles from './NewSaleSearchSection.module.scss';
import Icon from '@iconify/react';
import SaleSearchResultCard from './components/SaleSearchResultCard/SaleSearchResultCard';
import { times } from 'lodash';

interface INewSaleSearchSectionProps {
    saleData: State<ISaleData>;
}

export const NewSaleSearchSection = (props: INewSaleSearchSectionProps): ReactElement => {
    // props
    const {} = props;

    // hooks
    const searchFieldRef = useRef<HTMLInputElement>(null);

    // state
    const searchQuery = useState('sfd');
    const isSearching = useState(false);
    const searchResults = useState<IProductData[]>([]);

    // handlers
    const onSearchInitaiteClickHandler = () => searchFieldRef.current.focus();

    const searchFieldOnChangeHandler: IInputFieldProps['onChange'] = (event) => {
        searchQuery.set(event.target.value);
    };

    return (
        <div className={styles.searchSectionWrapper}>
            <InputField
                ref={searchFieldRef}
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
            {searchQuery.get().length === 0 && searchResults.get().length === 0 && (
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
            {/* search loader block */}
            {isSearching.get() && (
                <div className={styles.searchResultSecitonWrapper}>
                    {times(3).map((key) => (
                        <Skeleton key={key} animation="pulse">
                            <SaleSearchResultCard
                                productImage={undefined}
                                productName={null}
                                stockUnit={null}
                                unitPrice={null}
                            />
                        </Skeleton>
                    ))}
                </div>
            )}
            {/* search results block */}
            {searchResults.get().length > 0 && (
                <div className={styles.searchResultSecitonWrapper}>
                    {searchResults.map((searchResult) => (
                        <SaleSearchResultCard
                            key={searchResult.id.get()}
                            productImage={undefined}
                            productName={'Tomato'}
                            stockUnit={'kg'}
                            unitPrice={20}
                        />
                    ))}
                </div>
            )}
            {/* no results found block */}
            {isSearching.get() === false &&
                searchQuery.get().length > 0 &&
                searchResults.get().length === 0 && (
                    <div className={styles.searchResultSecitonWrapper}>
                        <h5>No results found</h5>
                    </div>
                )}
        </div>
    );
};
