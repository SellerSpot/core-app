import React from 'react';
import {
    IconButton,
    Switch,
    ToolTip,
    TTableCellCustomRenderer,
} from '@sellerspot/universal-components';
import { IInventoryData } from '@sellerspot/universal-types';
import styles from './CustomRenderers.module.scss';
import Icon from '@iconify/react';
import { ICONS } from 'utilities/utilities';

interface IActionsCustomRenderer {
    editItemClickHandler: (rowData: IInventoryData) => () => void;
    deleteItemClickHandler: (rowData: IInventoryData) => () => void;
}

export const SnoCustomRenderer: TTableCellCustomRenderer<IInventoryData> = (props) => {
    // props
    const { rowIndex } = props;
    // draw
    return rowIndex + 1;
};

export const ProductCustomRenderer: TTableCellCustomRenderer<IInventoryData> = (props) => {
    // props
    const { rowData } = props;
    const { name } = rowData.product;
    // draw
    return name;
};

export const CategoryCustomRenderer: TTableCellCustomRenderer<IInventoryData> = (props) => {
    // props
    const { rowData } = props;
    const { category } = rowData.product;
    // draw
    return category.title;
};

export const StockAvailableCustomRenderer: TTableCellCustomRenderer<IInventoryData> = (props) => {
    // props
    const { rowData } = props;
    const { stock } = rowData;
    // draw
    return stock;
};

export const MRPCustomRenderer: TTableCellCustomRenderer<IInventoryData> = (props) => {
    // props
    const { rowData } = props;
    const { mrp } = rowData;
    // draw
    return mrp;
};

export const ActiveCustomRenderer: TTableCellCustomRenderer<IInventoryData> = (props) => {
    // props
    const { rowData } = props;
    const { isActive } = rowData;
    // draw
    return <Switch checked={isActive} theme="primary" size="small" />;
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
