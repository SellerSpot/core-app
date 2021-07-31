import React, { Fragment, ReactElement } from 'react';
import { IBill90MMChildProps } from '../../Bill90MM.types';
import styles from './Bill90MMProductsListing.module.scss';
import mainStyles from '../../Bill90MM.module.scss';

const ListingRow = (props: {
    data: IBill90MMChildProps['data']['productCartInformation'][0];
    settings: IBill90MMChildProps['settings'];
}): ReactElement => {
    const { data } = props;
    const { name, quantity, price, stockUnit, total, discountValue, totalDiscountValue } = data;
    return (
        <>
            <div className={styles.productsListingTableBodyRow}>
                <div className={styles.primaryDetails}>
                    <p className={styles.productName}>{name}</p>
                    <p className={styles.productPrice}>{total}</p>
                </div>
                {quantity > 1 ? (
                    <p
                        className={styles.multiQuantityDetail}
                    >{`(${quantity} ${stockUnit} @ ${price})`}</p>
                ) : null}
                {!!discountValue ? (
                    <div className={styles.discountDetail}>
                        <p>Discount</p>
                        <p>{totalDiscountValue}</p>
                    </div>
                ) : null}
            </div>
            <hr className={styles.rowDivider} />
        </>
    );
};

export const Bill90MMProductsListing = (props: IBill90MMChildProps): ReactElement => {
    const { data, settings } = props;
    const { productCartInformation = [] } = data;
    return (
        <div className={styles.productsListingWrapper}>
            <div className={styles.productsListingTableHeader}>
                <p>Item</p>
                <p>Price</p>
            </div>
            <hr className={mainStyles.mainDivider} />
            <div className={styles.productsListingTableBodyWrapper}>
                {productCartInformation.map((product, productIndex) => (
                    <Fragment key={productIndex}>
                        <div className={mainStyles.PageBreak} />
                        <ListingRow data={product} settings={settings} />
                    </Fragment>
                ))}
            </div>
        </div>
    );
};
