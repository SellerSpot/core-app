import React from 'react';
import {
    Switch,
    TTableCellCustomRenderer,
} from '../../../../../../../.yalc/@sellerspot/universal-components/dist';
import { IInventoryData } from '../../../../../../../.yalc/@sellerspot/universal-types/dist';

export const SnoCustomRenderer: TTableCellCustomRenderer<IInventoryData> = (props) => {
    // props
    const { rowIndex } = props;
    // draw
    return <h6>{rowIndex + 1}</h6>;
};

export const ProductCustomRenderer: TTableCellCustomRenderer<IInventoryData> = (props) => {
    // props
    const { rowData } = props;
    const { name } = rowData.product;
    // draw
    return <h6>{name}</h6>;
};

export const CategoryCustomRenderer: TTableCellCustomRenderer<IInventoryData> = (props) => {
    // props
    const { rowData } = props;
    const { category } = rowData.product;
    // draw
    return <h6>{category.title}</h6>;
};

export const StockAvailableCustomRenderer: TTableCellCustomRenderer<IInventoryData> = (props) => {
    // props
    const { rowData } = props;
    const { stock } = rowData;
    // draw
    return <h6>{stock}</h6>;
};

export const MRPCustomRenderer: TTableCellCustomRenderer<IInventoryData> = (props) => {
    // props
    const { rowData } = props;
    const { maxRetailPrice } = rowData;
    // draw
    return <h6>{maxRetailPrice}</h6>;
};

export const ActiveCustomRenderer: TTableCellCustomRenderer<IInventoryData> = (props) => {
    // props
    const { rowData } = props;
    const { isActive } = rowData;
    // draw
    return <Switch checked={isActive} theme="primary" size="small" />;
};
