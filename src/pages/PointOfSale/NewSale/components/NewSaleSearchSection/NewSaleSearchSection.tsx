import { Dummies } from 'dummies/Dummies';
import { debounce, times } from 'lodash';
import React, { MutableRefObject, ReactElement, forwardRef, useEffect, useRef } from 'react';
import { ICONS } from 'utilities/utilities';
import { State, useState } from '@hookstate/core';
import Icon from '@iconify/react';
import { Button, IInputFieldProps, InputField, Skeleton } from '@sellerspot/universal-components';
import { IStockUnitData } from '@sellerspot/universal-types';
import { newSaleState } from '../../NewSale';
import { NewSaleService } from '../../NewSale.service';
import styles from './NewSaleSearchSection.module.scss';
import { NewSaleSearchSectionService } from './NewSaleSearchSection.service';
import SaleSearchResultCard from './components/SaleSearchResultCard/SaleSearchResultCard';

export const NewSaleSearchSectionComponent = (
    _: unknown,
    ref: MutableRefObject<HTMLDivElement>,
): ReactElement => {
    // hooks
    const searchFieldRef = useRef<HTMLInputElement>(null);
    const defaultOutletId = Dummies.newSale.DEFAULT_OUTLET_ID;

    // state
    const search = useState(newSaleState.search);

    // effects
    useEffect(() => {
        ref.current = searchFieldRef.current;
    }, [searchFieldRef]);

    useEffect(() => {
        // on mount, if search field has any previous query, fetch the results using that old query
        fetchSearchResults(search.query.get());
    }, []);

    // handlers
    const onSearchInitaiteClickHandler = () => searchFieldRef.current.focus();

    const fetchSearchResults = debounce(async (searchQuery: string) => {
        const { passedQuery, results } = await NewSaleSearchSectionService.searchInventoryProducts(
            searchQuery,
        );
        // restricting race conditions
        if (search.query.get() === passedQuery) {
            search.merge({
                results,
                searching: false,
            });
        }
    }, 100);

    const searchFieldOnChangeHandler: IInputFieldProps['onChange'] = (event) => {
        search.merge({
            query: event.target.value,
            searching: true,
            results: [],
        });
        fetchSearchResults(event.target.value);
    };

    const addToCartHanlder = (resultIndex: number) => () => {
        const currentProduct = search.results[resultIndex].get();
        // add product to the cart, if product is already in the cart increase the count by one
        NewSaleService.addProductToCart(currentProduct, defaultOutletId);
    };

    return (
        <div className={styles.searchSectionWrapper}>
            <InputField
                ref={searchFieldRef}
                autoFocus={true}
                label="Search for products"
                placeHolder="Start typing or scaning"
                theme="primary"
                size="medium"
                fullWidth={true}
                value={search.get().query}
                disableHelperTextPlaceholderPadding={true}
                suffix={<Icon icon={ICONS.outlineSearch} />}
                onChange={searchFieldOnChangeHandler}
            />
            {/* search initiate info block */}
            {search.query.get().length === 0 && search.results.get().length === 0 && (
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
            {search.searching.get() && search.query.get().length > 0 && (
                <div className={styles.searchResultSecitonWrapper}>
                    {times(3).map((key) => (
                        <Skeleton key={key} animation="wave" width="100%">
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
            {search.results.get().length > 0 && (
                <div className={styles.searchResultSecitonWrapper}>
                    {search.results.map((searchResult, resultIndex) => (
                        <SaleSearchResultCard
                            key={searchResult.id.get()}
                            productImage={undefined}
                            productName={searchResult.name.get()}
                            stockUnit={(searchResult.stockUnit as State<IStockUnitData>).unit.get()}
                            unitPrice={searchResult.outlets[defaultOutletId].sellingPrice.get()}
                            onClick={addToCartHanlder(resultIndex)}
                        />
                    ))}
                </div>
            )}
            {/* no results found block */}
            {search.searching.get() === false &&
                search.query.get().length > 0 &&
                search.results.get().length === 0 && (
                    <div className={styles.searchResultSecitonWrapper}>
                        <h5>No results found</h5>
                    </div>
                )}
        </div>
    );
};

export const NewSaleSearchSection = forwardRef(NewSaleSearchSectionComponent);
