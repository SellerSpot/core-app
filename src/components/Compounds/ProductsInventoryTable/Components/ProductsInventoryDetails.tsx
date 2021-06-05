import { Button } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { IProductsInventoryTableProps } from '../ProductsInventoryTable';
import styles from '../ProductsInventoryTable.module.scss';

const Controls = (): ReactElement => {
    return (
        <>
            <Button
                key={'editProductBtn'}
                fullWidth
                label={'Edit Product'}
                variant="contained"
                theme="primary"
            />
            <Button
                key={'deleteProductBtn'}
                fullWidth
                label={'Delete Product'}
                variant="outlined"
                theme="danger"
            />
        </>
    );
};

export const ProductsInventoryDetails = (props: {
    product: IProductsInventoryTableProps['products'][0];
}): ReactElement => {
    const {
        product: { productName, category, brand, description },
    } = props;
    return (
        <div className={styles.productsCatalogDetails}>
            <div className={styles.detailsWrapper}>
                <div className={styles.topRow}>
                    <div className={styles.topRowProductName}>
                        <h6>Product Name</h6>
                        <p>{productName}</p>
                    </div>
                    <div className={styles.topRowCategory}>
                        <h6>Category</h6>
                        <p>{category}</p>
                    </div>
                    <div className={styles.topRowBrand}>
                        <h6>Brand</h6>
                        <p>{brand}</p>
                    </div>
                </div>
                <div>
                    <div>
                        <h6>Description</h6>
                        <p>{description}</p>
                    </div>
                </div>
            </div>
            <div className={styles.controlsWrapper}>
                <Controls />
            </div>
        </div>
    );
};
