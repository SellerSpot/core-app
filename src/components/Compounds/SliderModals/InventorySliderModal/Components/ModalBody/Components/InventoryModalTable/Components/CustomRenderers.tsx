import { State, useState } from '@hookstate/core';
import {
    IInputFieldProps,
    InputField,
    TTableCellCustomRenderer,
} from '@sellerspot/universal-components';
import { IInventoryData } from '@sellerspot/universal-types';
import React from 'react';

type TCustomRenderer = TTableCellCustomRenderer<IInventoryData>;

export const OutletCustomRenderer: TCustomRenderer = (props) => {
    // props
    const { rowData } = props;
    // draw
    return rowData.outlet.name;
};

export const StockCustomRenderer = (state: State<IInventoryData[]>): TCustomRenderer =>
    function StockCustom(props) {
        // props
        const { rowIndex } = props;
        // state
        const localState = useState(state);
        // values
        const value = `${localState[rowIndex].stock.get()}`;
        // handlers
        const onChangeHandler: IInputFieldProps['onChange'] = (event) => {
            localState[rowIndex].stock.set(+event.target.value);
        };
        // draw
        return (
            <InputField
                fullWidth
                size="small"
                theme="primary"
                value={value}
                direction={'rtl'}
                disableHelperTextPlaceholderPadding
                onChange={onChangeHandler}
                type="number"
            />
        );
    };

export const LandingCostCustomRenderer = (state: State<IInventoryData[]>): TCustomRenderer =>
    function LandingCost(props) {
        // props
        const { rowIndex } = props;
        // state
        const localState = useState(state);
        // values
        const value = `${localState[rowIndex].landingCost.get()}`;
        // handlers
        const onChangeHandler: IInputFieldProps['onChange'] = (event) => {
            localState[rowIndex].landingCost.set(+event.target.value);
        };
        // draw
        return (
            <InputField
                fullWidth
                size="small"
                theme="primary"
                value={value}
                direction={'rtl'}
                disableHelperTextPlaceholderPadding
                onChange={onChangeHandler}
                type="number"
            />
        );
    };

export const MarkupCustomRenderer = (state: State<IInventoryData[]>): TCustomRenderer =>
    function Markup(props) {
        // props
        const { rowIndex } = props;
        // state
        const localState = useState(state);
        // values
        const value = `${localState[rowIndex].landingCost.get()}`;
        // handlers
        const onChangeHandler: IInputFieldProps['onChange'] = (event) => {
            localState[rowIndex].markup.set(+event.target.value);
        };
        // draw
        return (
            <InputField
                fullWidth
                size="small"
                theme="primary"
                value={value}
                direction={'rtl'}
                disableHelperTextPlaceholderPadding
                onChange={onChangeHandler}
                type="number"
            />
        );
    };

export const MRPCustomRenderer = (state: State<IInventoryData[]>): TCustomRenderer =>
    function MRP(props) {
        // props
        const { rowIndex } = props;
        // state
        const localState = useState(state);
        // values
        const value = `${localState[rowIndex].mrp.get()}`;
        // handlers
        const onChangeHandler: IInputFieldProps['onChange'] = (event) => {
            localState[rowIndex].mrp.set(+event.target.value);
        };
        // draw
        return (
            <InputField
                fullWidth
                size="small"
                theme="primary"
                value={value}
                direction={'rtl'}
                disableHelperTextPlaceholderPadding
                onChange={onChangeHandler}
                type="number"
            />
        );
    };
