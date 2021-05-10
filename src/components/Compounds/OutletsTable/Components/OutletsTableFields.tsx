import { InputField } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { IOutletsTableProps, useOutletTableState } from '../OutletsTable';

export const CurrentStockField = (props: {
    outletIndex: number;
    outlet: IOutletsTableProps['data'][0];
}): ReactElement => {
    const { outletIndex, outlet } = props;
    const { currentStock, stockUnit } = outlet;
    const { data, setData } = useOutletTableState();
    const value = currentStock + '';
    const suffix: ReactElement = <h6>{stockUnit}</h6>;
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value;
        data[outletIndex].currentStock = +value;
        setData(data);
    };
    return (
        <InputField
            key={outletIndex}
            size="small"
            minNumericValue={0}
            fullWidth
            value={value}
            selectTextOnFocus
            suffix={suffix}
            direction="rtl"
            type="number"
            onChange={handleOnChange}
            disableHelperTextPlaceholderPadding
            theme="primary"
        />
    );
};

export const SupplyPriceField = (props: {
    outletIndex: number;
    outlet: IOutletsTableProps['data'][0];
}): ReactElement => {
    const { outletIndex, outlet } = props;
    const { supplyPrice } = outlet;
    const { data, setData } = useOutletTableState();
    const value = supplyPrice + '';
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value;
        data[outletIndex].supplyPrice = +value;
        setData(data);
    };
    return (
        <InputField
            key={outletIndex}
            size="small"
            minNumericValue={0}
            fullWidth
            value={value}
            direction="rtl"
            selectTextOnFocus
            type="number"
            onChange={handleOnChange}
            disableHelperTextPlaceholderPadding
            theme="primary"
            prefix={<h6>₹</h6>}
        />
    );
};

export const MarkupPercentageField = (props: {
    outletIndex: number;
    outlet: IOutletsTableProps['data'][0];
}): ReactElement => {
    const { outletIndex, outlet } = props;
    const { markupPercentage } = outlet;
    const { data, setData } = useOutletTableState();
    const value = markupPercentage + '';
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value;
        data[outletIndex].markupPercentage = +value;
        setData(data);
    };
    return (
        <InputField
            key={outletIndex}
            size="small"
            minNumericValue={0}
            fullWidth
            value={value}
            direction="rtl"
            selectTextOnFocus
            type="number"
            onChange={handleOnChange}
            disableHelperTextPlaceholderPadding
            theme="primary"
            suffix={<h6>%</h6>}
        />
    );
};

export const RetailPriceField = (props: {
    outletIndex: number;
    outlet: IOutletsTableProps['data'][0];
}): ReactElement => {
    const { outletIndex, outlet } = props;
    const { retailPrice } = outlet;
    const { data, setData } = useOutletTableState();
    const value = retailPrice + '';
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value;
        data[outletIndex].retailPrice = +value;
        setData(data);
    };
    return (
        <InputField
            key={outletIndex}
            size="small"
            minNumericValue={0}
            fullWidth
            value={value}
            direction="rtl"
            selectTextOnFocus
            type="number"
            onChange={handleOnChange}
            disableHelperTextPlaceholderPadding
            theme="primary"
            prefix={<h6>₹</h6>}
        />
    );
};
