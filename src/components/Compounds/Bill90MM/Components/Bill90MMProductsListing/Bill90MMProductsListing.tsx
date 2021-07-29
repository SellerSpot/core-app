import React, { Fragment, ReactElement } from 'react';
import { IBill90MMChildProps } from '../../Bill90MM.types';
import styles from './Bill90MMProductsListing.module.scss';
import mainStyles from '../../Bill90MM.module.scss';

const ListingRow = (
    props: IBill90MMChildProps['data']['productCartInformation'][0],
): ReactElement => {
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

export const Bill90MMProductsListing = (props: IBill90MMChildProps): ReactElement => {
    const { data } = props;
    const { products } = data;
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
                        {/* <ListingRow product={product} /> */}
                    </Fragment>
                ))}
            </div>
        </div>
    );
};
