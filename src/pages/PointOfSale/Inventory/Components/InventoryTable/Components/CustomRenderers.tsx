import Icon from '@iconify/react';
import {
    Button,
    IButtonProps,
    IconButton,
    ITableCollapsedCustomRenderer,
    ITableProps,
    numberFormatINRCurrency,
    Switch,
    Table,
    ToolTip,
    TTableCellCustomRenderer,
} from '@sellerspot/universal-components';
import {
    IBrandData,
    ICategoryData,
    IInventoryData,
    IOutletData,
    IStockUnitData,
    ITaxBracketData,
} from '@sellerspot/universal-types';
import React from 'react';
import { ICONS } from 'utilities/utilities';
import styles from './CustomRenderers.module.scss';

interface IActionsCustomRenderer {
    editItemClickHandler: (rowData: IInventoryData) => IButtonProps['onClick'];
    deleteItemClickHandler: (rowData: IInventoryData) => IButtonProps['onClick'];
}

type IOutletTableData = IInventoryData['configurations'][0];

export const SnoCustomRenderer: TTableCellCustomRenderer<IInventoryData> = (props) => {
    // props
    const { rowIndex } = props;
    // draw
    return rowIndex + 1;
};

export const ProductCustomRenderer: TTableCellCustomRenderer<IInventoryData> = (props) => {
    // props
    const { rowData } = props;
    // draw
    return rowData.name;
};

export const StockAvailableCustomRenderer: TTableCellCustomRenderer<IInventoryData> = (props) => {
    // props
    const { rowData } = props;
    // getting all outlets for current product
    const outlets = Object.keys(rowData.configurations);
    let stockValue = 0;
    // adding all outlet stock values
    outlets.map((outletId) => {
        stockValue += rowData.configurations[outletId].stock;
    });

    // draw
    return `${stockValue} ${(rowData.stockUnit as IStockUnitData).unit}`;
};

export const ActionsCustomRenderer = (
    extraProps: IActionsCustomRenderer,
): TTableCellCustomRenderer<IInventoryData> =>
    function ActionsRenderer(props) {
        // props
        const { rowData } = props;
        const { deleteItemClickHandler, editItemClickHandler } = extraProps;

        // draw
        return (
            <div className={styles.rowActions}>
                <div className={styles.minActions}>
                    <ToolTip content="Edit">
                        <div>
                            <IconButton
                                icon={<Icon icon={ICONS.baselineEdit} height={'20px'} />}
                                size="small"
                                theme="primary"
                                onClick={editItemClickHandler(rowData)}
                            />
                        </div>
                    </ToolTip>
                    <ToolTip content="Delete">
                        <div>
                            <IconButton
                                icon={<Icon icon={ICONS.outlineDeleteOutline} height={'20px'} />}
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

export const CustomCollapsedContentRenderer = (
    extraProps: IActionsCustomRenderer,
): ITableCollapsedCustomRenderer<IInventoryData> =>
    function CustomCollapsedContentRendererFun(props) {
        // props
        const { rowData: collapsedRowData } = props;
        const { deleteItemClickHandler, editItemClickHandler } = extraProps;
        const productName = collapsedRowData.name;
        const categoryName = (collapsedRowData.category as ICategoryData).title;
        const brand = (collapsedRowData.brand as IBrandData).name;
        const tags = collapsedRowData.tags.join(',');
        const description = collapsedRowData.description;
        const outlets = Object.keys(collapsedRowData.configurations);
        const tableData: IOutletTableData[] = outlets.map((outletId) => {
            return collapsedRowData.configurations[outletId];
        });

        // outlet data props
        const outletDataProps: ITableProps<IOutletTableData> = {
            data: tableData,
            size: 'small',
            shape: [
                {
                    columnName: 'Outlet',
                    align: 'left',
                    width: '15%',
                    customRenderer: (props) => {
                        const { rowData } = props;
                        return (rowData.outlet as IOutletData).name;
                    },
                },
                {
                    columnName: `Stock (${(collapsedRowData.stockUnit as IStockUnitData).unit})`,
                    align: 'center',
                    customRenderer: (props) => {
                        const { rowData } = props;
                        return `${rowData.stock}`;
                    },
                },
                {
                    columnName: 'Landing Cost',
                    align: 'center',
                    customRenderer: (props) => {
                        const { rowData } = props;
                        return numberFormatINRCurrency(rowData.landingCost);
                    },
                },
                {
                    columnName: 'Markup',
                    align: 'center',
                    customRenderer: (props) => {
                        const { rowData } = props;
                        return numberFormatINRCurrency(rowData.markup);
                    },
                },
                {
                    columnName: 'Selling Price',
                    align: 'center',
                    customRenderer: (props) => {
                        const { rowData } = props;
                        return numberFormatINRCurrency(rowData.sellingPrice);
                    },
                },
                {
                    columnName: 'MRP',
                    align: 'center',
                    customRenderer: (props) => {
                        const { rowData } = props;
                        return numberFormatINRCurrency(rowData.mrp);
                    },
                },
                {
                    columnName: 'IsActive',
                    align: 'center',
                    customRenderer: function IsActiveCustomRenderer(props) {
                        const { rowData } = props;
                        return <Switch checked={rowData.isActive} size="small" theme="primary" />;
                    },
                },
                {
                    columnName: 'IsTrack',
                    align: 'center',
                    customRenderer: function ITrackCustomRenderer(props) {
                        const { rowData } = props;
                        return <Switch checked={rowData.isTrack} size="small" theme="primary" />;
                    },
                },
                {
                    columnName: 'Tax Rate',
                    align: 'center',
                    customRenderer: function ITrackCustomRenderer(props) {
                        const { rowData } = props;
                        const taxRate = (rowData.taxSetting as ITaxBracketData).rate;
                        return `${taxRate}%`;
                    },
                },
            ],
        };

        // draw
        return (
            <div className={styles.collapsedContentWrapper}>
                <div className={styles.productDetails}>
                    <div className={styles.metaDetails}>
                        <div className={styles.metaDetailsMainRow}>
                            <div>
                                <h6>Product Name</h6>
                                <p>{productName}</p>
                            </div>
                            <div>
                                <h6>Category</h6>
                                <p>{categoryName}</p>
                            </div>
                            <div>
                                <h6>Brand</h6>
                                <p>{brand}</p>
                            </div>
                            <div>
                                <h6>Tags</h6>
                                <p>{tags}</p>
                            </div>
                        </div>
                        <div className={styles.metaDetailsSecondRow}>
                            <h6>Description</h6>
                            <p>{description}</p>
                        </div>
                    </div>
                    <div className={styles.actions}>
                        <Button
                            label={'Edit Product'}
                            fullWidth
                            startIcon={<Icon icon={ICONS.baselineEdit} height={20} />}
                            variant="contained"
                            theme="primary"
                            onClick={editItemClickHandler(collapsedRowData)}
                        />
                        <Button
                            label={'Delete Product'}
                            fullWidth
                            startIcon={<Icon icon={ICONS.outlineDeleteOutline} height={20} />}
                            variant="outlined"
                            theme="danger"
                            onClick={deleteItemClickHandler(collapsedRowData)}
                        />
                    </div>
                </div>
                <div className={styles.outletTableWrapper}>
                    <Table {...outletDataProps} />
                </div>
            </div>
        );
    };
