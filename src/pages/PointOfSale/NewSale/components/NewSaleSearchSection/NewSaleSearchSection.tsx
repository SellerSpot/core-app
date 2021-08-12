import { State, useState } from '@hookstate/core';
import React, { ReactElement, useRef } from 'react';
import { ICONS } from 'utilities/utilities';
import { Button, IInputFieldProps, InputField, Skeleton } from '@sellerspot/universal-components';
import { IInventoryData, ISaleData, IStockUnitData } from '@sellerspot/universal-types';
import styles from './NewSaleSearchSection.module.scss';
import Icon from '@iconify/react';
import SaleSearchResultCard from './components/SaleSearchResultCard/SaleSearchResultCard';
import { debounce, times } from 'lodash';
import { NewSaleSearchSectionService } from './NewSaleSearchSection.service';
import { Dummies } from 'dummies/Dummies';
import { NewSaleService } from '../../NewSale.service';

interface INewSaleSearchSectionProps {
    saleData: State<ISaleData>;
}

export const NewSaleSearchSection = (props: INewSaleSearchSectionProps): ReactElement => {
    // props
    const { saleData } = props;

    // hooks
    const searchFieldRef = useRef<HTMLInputElement>(null);
    const defaultOutletId = Dummies.newSale.DEFAULT_OUTLET_ID;

    // state
    const search = useState<{
        query: string;
        searching: boolean;
        results: IInventoryData[];
    }>({ query: 'sfd', searching: false, results: [] });

    // handlers
    const onSearchInitaiteClickHandler = () => searchFieldRef.current.focus();

    const searchFieldOnChangeHandler: IInputFieldProps['onChange'] = debounce(async (event) => {
        search.merge({
            query: event.target.value,
            searching: true,
        });
        const searchResponse = await NewSaleSearchSectionService.searchInventoryProducts(
            event.target.value,
        );
        search.merge({
            results: searchResponse,
            searching: false,
        });
    }, 200);

    const addToCartHanlder = (resultIndex: number) => () => {
        const currentProduct = search.results[resultIndex].get();
        // add product to the cart, if product is already in the cart increase the count by one
        NewSaleService.addProductToTheCart(saleData, currentProduct, defaultOutletId);
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
            {search.searching.get() && (
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
