import { Button, ITableProps, ITableRow, Table } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { IProductsInventoryTableProps } from '../ProductsInventoryTable';
import styles from '../ProductsInventoryTable.module.scss';
import { ProductsInventoryTableService } from '../ProductsInventoryTable.service';

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

const getTableBody = (props: {
    outlets: IProductsInventoryTableProps['products'][0]['outlets'];
}): ITableRow[] => {
    const { outlets } = props;
    return outlets.map((outlet) => {
        return {
            cells: ProductsInventoryTableService.outletTableCell(outlet),
        };
    });
};

const OutletTable = (props: {
    outlets: IProductsInventoryTableProps['products'][0]['outlets'];
}) => {
    const { outlets } = props;
    const tableBody: ITableProps['body'] = ({}) => {
        return getTableBody({
            outlets,
        });
    };

    return (
        <Table
            size="small"
            variant="simple"
            maxHeight={150}
            stickyHeader
            headers={ProductsInventoryTableService.outletTableHeaders}
            body={tableBody}
        />
    );
};

export const ProductsInventoryDetails = (props: {
    product: IProductsInventoryTableProps['products'][0];
}): ReactElement => {
    const {
        product: { productName, category, brand, description, outlets },
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
                <OutletTable outlets={outlets} />
            </div>
            <div className={styles.controlsWrapper}>
                <Controls />
            </div>
        </div>
    );
};
