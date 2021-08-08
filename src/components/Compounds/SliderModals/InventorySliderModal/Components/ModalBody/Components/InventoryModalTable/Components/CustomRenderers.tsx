import {
    AsyncCreatableSelect,
    InputField,
    ISelectOption,
    TTableCellCustomRenderer,
} from '@sellerspot/universal-components';
import { IOutletData } from '@sellerspot/universal-types';
import React from 'react';
import { useField } from 'react-final-form';

type TCustomRenderer = TTableCellCustomRenderer<IOutletData>;

export const OutletCustomRenderer: TCustomRenderer = (props) => {
    // props
    const { rowData } = props;
    // draw
    return rowData.name;
};

export const StockCustomRenderer: TCustomRenderer = (props) => {
    // props
    const { rowData } = props;
    const fieldName = `${rowData.id}.stock`;

    // hooks
    const { input } = useField(fieldName, {
        validateFields: [],
    });
    const { value } = input;

    // draw
    return (
        <InputField
            {...input}
            name={null}
            value={value as string}
            fullWidth
            size="small"
            theme="primary"
            direction={'rtl'}
            disableHelperTextPlaceholderPadding
            type="number"
        />
    );
};

export const LandingCostCustomRenderer: TCustomRenderer = (props) => {
    // props
    const { rowData } = props;
    const fieldName = `${rowData.id}.landingCost`;

    // hooks
    const { input } = useField(fieldName, {
        validateFields: [],
    });
    const { value } = input;

    // draw
    return (
        <InputField
            {...input}
            name={null}
            value={value as string}
            fullWidth
            size="small"
            theme="primary"
            direction={'rtl'}
            disableHelperTextPlaceholderPadding
            type="number"
        />
    );
};

export const MarkupCustomRenderer: TCustomRenderer = (props) => {
    // props
    const { rowData } = props;
    const fieldName = `${rowData.id}.markup`;

    // hooks
    const { input } = useField(fieldName, {
        validateFields: [],
    });
    const { value } = input;

    // draw
    return (
        <InputField
            {...input}
            name={null}
            fullWidth
            size="small"
            theme="primary"
            value={value as string}
            direction={'rtl'}
            disableHelperTextPlaceholderPadding
            type="number"
        />
    );
};

export const MRPCustomRenderer: TCustomRenderer = (props) => {
    // props
    const { rowData } = props;
    const fieldName = `${rowData.id}.markup`;

    // hooks
    const { input } = useField(fieldName, {
        validateFields: [],
    });
    const { value } = input;

    // draw
    return (
        <InputField
            {...input}
            name={null}
            fullWidth
            size="small"
            theme="primary"
            value={value as string}
            direction={'rtl'}
            disableHelperTextPlaceholderPadding
            type="number"
        />
    );
};

export const TaxSettingCustomRenderer: TCustomRenderer = (props) => {
    // props
    const { rowData } = props;
    const fieldName = `${rowData.id}.taxSetting`;

    // hooks
    const { input } = useField(fieldName, {
        validateFields: [],
    });
    const { value, onChange } = input;
    console.log(value);

    // handlers
    const loadOptionsHandler = async (): Promise<ISelectOption[]> => {
        return [];
    };

    // draw
    return (
        <AsyncCreatableSelect
            loadOptions={loadOptionsHandler}
            value={value}
            disableHelperTextPlaceholderPadding
            onChange={onChange}
        />
    );
};
