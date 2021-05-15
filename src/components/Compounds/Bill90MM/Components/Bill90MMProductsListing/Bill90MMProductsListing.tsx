import React, { Fragment, ReactElement } from 'react';
import { IBill90MMProps } from '../../Bill90MM.types';
import styles from './Bill90MMProductsListing.module.scss';
import mainStyles from '../../Bill90MM.module.scss';

const ListingRow = (props: { product: IBill90MMProps['billData']['products'][0] }) => {
    const { product } = props;
    const { name, subTotal, quantity, stockUnit, unitPrice, discount } = product;
    return (
        <>
            <div className={styles.productsListingTableBodyRow}>
                <div className={styles.primaryDetails}>
                    <p className={styles.productName}>{name}</p>
                    <p className={styles.productPrice}>{subTotal}</p>
                </div>
                {quantity > 1 ? (
                    <p
                        className={styles.multiQuantityDetail}
                    >{`(${quantity} ${stockUnit} @ ${unitPrice})`}</p>
                ) : null}
                {!!discount ? (
                    <div className={styles.discountDetail}>
                        <p>Discount</p>
                        <p>{discount}</p>
                    </div>
                ) : null}
            </div>
            <hr className={styles.rowDivider} />
        </>
    );
};

export const Bill90MMProductsListing = (props: {
    billData: IBill90MMProps['billData'];
}): ReactElement => {
    const { billData } = props;
    const { products } = billData;
    return (
        <div className={styles.productsListingWrapper}>
            <div className={styles.productsListingTableHeader}>
                <p>Item</p>
                <p>Price</p>
            </div>
            <hr className={mainStyles.mainDivider} />
            <div className={styles.productsListingTableBodyWrapper}>
                {products.map((product, productIndex) => (
                    <Fragment key={productIndex}>
                        <div className={mainStyles.PageBreak} />
                        <ListingRow product={product} />
                    </Fragment>
                ))}
            </div>
        </div>
    );
};
