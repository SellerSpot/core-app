import { useState } from '@hookstate/core';
import { BillHolder } from 'components/Compounds/BillHolder/BillHolder';
import { TBillHolderRef } from 'components/Compounds/BillHolder/BillHolder.types';
import { billSizeComponentMap } from 'pages/PointOfSale/BillSettings/BillSettings';
import { newSaleState } from 'pages/PointOfSale/NewSale/NewSale';
import React, { forwardRef, ReactElement } from 'react';
import { rawClone } from 'utilities/general';

const CheckoutSliderBillPreviewComponent = (_: unknown, ref: TBillHolderRef): ReactElement => {
    // state
    const saleData = useState(newSaleState.saleData);
    const billSettings = useState(newSaleState.billSettings);

    // computer
    const currentBillName = saleData.billSettings.size.get();
    const CurrentBillComponent = billSizeComponentMap[currentBillName].BILL;
    const currentBillDimension = billSizeComponentMap[currentBillName].dimension;
    const currentBillSettingsState = billSettings?.bills?.[currentBillName];

    return (
        <BillHolder ref={ref}>
            <CurrentBillComponent
                data={rawClone(saleData.get())}
                settings={rawClone(currentBillSettingsState.get())}
                dimension={currentBillDimension}
            />
        </BillHolder>
    );
};

export const CheckoutSliderBillPreview = forwardRef(CheckoutSliderBillPreviewComponent);
