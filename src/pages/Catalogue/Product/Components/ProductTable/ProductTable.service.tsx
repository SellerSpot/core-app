import React from 'react';
import { requests } from 'requests/requests';
import { ICONS } from 'utilities/utilities';
import { State } from '@hookstate/core';
import Icon from '@iconify/react';
import {
    Button,
    ITableProps,
    IconButton,
    TTableCellCustomRenderer,
    ToolTip,
} from '@sellerspot/universal-components';
import {
    IBrandData,
    ICategoryData,
    IProductData,
    IStockUnitData,
} from '@sellerspot/universal-types';
import { IProductPageState } from '../../Product.types';
import styles from './ProductTable.module.scss';

interface IProductTableServiceProps {
    pageState: State<IProductPageState>;
    editItemClickHandler: (productData: IProductData) => () => void;
    deleteItemClickHandler: (productData: IProductData) => () => void;
}

export class ProductTableService {
    static getTableProps = (props: IProductTableServiceProps): ITableProps<IProductData> => {
        // props
        const { pageState, deleteItemClickHandler, editItemClickHandler } = props;

        // custom renderers
        const sNoCustomRenderer: TTableCellCustomRenderer<IProductData> = (props) => {
            // props
            const { rowIndex } = props;

            // draw
            return rowIndex + 1;
        };
        const brandCustomRenderer: TTableCellCustomRenderer<IProductData> = (props) => {
            // props
            const { rowData } = props;
            return (rowData.brand as IBrandData)?.name;
        };
        const stockUnitCustomRenderer: TTableCellCustomRenderer<IProductData> = (props) => {
            // props
            const { rowData } = props;
            return (rowData.stockUnit as IStockUnitData)?.unit;
        };
        const categoryCustomRenderer: TTableCellCustomRenderer<IProductData> = (props) => {
            // props
            const { rowData } = props;
            return (rowData.category as ICategoryData)?.title;
        };
        const actionsCustomRenderer: TTableCellCustomRenderer<IProductData> = (props) => {
            // props
            const { rowData } = props;

            // draw
            return (
                <div className={styles.rowActions}>
                    <div className={styles.minActions}>
                        <ToolTip content="Edit">
                            <div>
                                <IconButton
                                    icon={<Icon icon={ICONS.baselineEdit} />}
                                    size="small"
                                    theme="primary"
                                    onClick={editItemClickHandler(rowData)}
                                />
                            </div>
                        </ToolTip>
                        <ToolTip content="Delete">
                            <div>
                                <IconButton
                                    icon={<Icon icon={ICONS.outlineDeleteOutline} />}
                                    size="small"
                                    theme="danger"
                                    onClick={deleteItemClickHandler(rowData)}
                                />
                            </div>
                        </ToolTip>
                    </div>
                </div>
            );
        };

        const EmptyStatePrimaryCallToAction = () => {
            // handlers
            const handleOnClick = () => {
                pageState.sliderModal.merge({
                    mode: 'create',
                    prefillData: null,
                    showModal: true,
                });
            };

            return (
                <Button
                    label="NEW PRODUCT"
                    theme="primary"
                    size="small"
                    onClick={handleOnClick}
                    variant="contained"
                    startIcon={<Icon icon={ICONS.outlineAdd} />}
                />
            );
        };

        // draw
        return {
            data: pageState.allProducts.get(),
            shape: [
                {
                    columnName: 'S.No',
                    width: '5%',
                    align: 'center',
                    customRenderer: sNoCustomRenderer,
                },
                {
                    dataKey: 'name',
                    columnName: 'Product',
                    width: '40%',
                },
                {
                    dataKey: 'brand',
                    columnName: 'Brand',
                    align: 'center',
                    customRenderer: brandCustomRenderer,
                },
                {
                    dataKey: 'barcode',
                    columnName: 'Barcode',
                    align: 'center',
                },
                {
                    dataKey: 'category',
                    columnName: 'Category',
                    align: 'center',
                    customRenderer: categoryCustomRenderer,
                },
                {
                    dataKey: 'stockUnit',
                    align: 'center',
                    columnName: 'Stock Unit',
                    customRenderer: stockUnitCustomRenderer,
                },
                {
                    columnName: 'Actions',
                    align: 'center',
                    width: '100px',
                    customRenderer: actionsCustomRenderer,
                },
            ],
            emptyStateMessage: 'You have not added any brackets yet',
            emptyStatePrimaryCallToAction: <EmptyStatePrimaryCallToAction />,
        };
    };

    static deleteProduct = async (props: { productId: string }): Promise<void> => {
        // props
        const { productId } = props;
        // request
        await requests.catalogue.productRequest.deleteProduct(productId);
    };
}
