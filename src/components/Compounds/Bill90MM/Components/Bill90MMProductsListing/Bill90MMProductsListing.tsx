import React, { Fragment, ReactElement } from 'react';
import { IBill90MMChildProps } from '../../Bill90MM.types';
import styles from './Bill90MMProductsListing.module.scss';
import mainStyles from '../../Bill90MM.module.scss';
import { ICartDetails } from '@sellerspot/universal-types';
import { numberFormatINRCurrency } from '@sellerspot/universal-components';

const ListingRow = (props: {
    data: ICartDetails;
    settings: IBill90MMChildProps['settings'];
}): ReactElement => {
    const { data } = props;
    const {
        product: { name },
        quantity,
        sellingPrice,
        stockUnit,
        grandTotal,
        totalDiscount,
        totalTax,
    } = data;
    return (
        <>
            <div className={styles.productsListingTableBodyRow}>
                <div className={styles.primaryDetails}>
                    <p className={styles.productName}>{name}</p>
                    <p className={styles.productPrice}>{numberFormatINRCurrency(grandTotal)}</p>
                </div>
                <p
                    className={styles.multiQuantityDetail}
                >{`(${quantity} ${stockUnit.name} @ ${sellingPrice})`}</p>
                <div className={styles.discountDetail}>
                    <p>Discount</p>
                    <p>{numberFormatINRCurrency(totalDiscount)}</p>
                </div>
                <div className={styles.discountDetail}>
                    <p>Tax</p>
                    <p>{numberFormatINRCurrency(totalTax)}</p>
                </div>
            </div>
            <hr className={styles.rowDivider} />
        </>
    );
};

export const Bill90MMProductsListing = (props: IBill90MMChildProps): ReactElement => {
    const { data, settings } = props;
    const { cart } = data;
    return (
        <div className={styles.productsListingWrapper}>
            <div className={styles.productsListingTableHeader}>
                <p>Item</p>
                <p>Price</p>
            </div>
            <hr className={mainStyles.mainDivider} />
            <div className={styles.productsListingTableBodyWrapper}>
                {cart.map((product, productIndex) => (
                    <Fragment key={productIndex}>
                        <div className={mainStyles.PageBreak} />
                        <ListingRow data={product} settings={settings} />
                    </Fragment>
                ))}
            </div>
        </div>
    );
};
