import { ITableProps, Table } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { IInventoryData } from '@sellerspot/universal-types';
import {
    LandingCostCustomRenderer,
    MarkupCustomRenderer,
    MRPCustomRenderer,
    OutletCustomRenderer,
    StockCustomRenderer,
} from './Components/CustomRenderers';
import { IInventorySliderModalProps } from 'components/Compounds/SliderModals/InventorySliderModal/InventorySliderModal.types';
import { useState } from '@hookstate/core';

type IInventoryModalTableProps = Pick<IInventorySliderModalProps, 'prefillData'>;

export const InventoryModalTable = (props: IInventoryModalTableProps): ReactElement => {
    // props
    const { prefillData } = props;

    // state to help edit values
    const tableState = useState<IInventoryData[]>(prefillData);

    // table props
    const tableProps: ITableProps<IInventoryData> = {
        data: prefillData,
        stickyHeader: true,
        shape: [
            {
                columnName: 'Outlet',
                align: 'left',
                width: '150px',
                customRenderer: OutletCustomRenderer,
            },
            {
                columnName: 'Stock',
                align: 'center',
                customRenderer: StockCustomRenderer(tableState),
            },
            {
                columnName: 'Landing Cost',
                align: 'center',
                customRenderer: LandingCostCustomRenderer(tableState),
            },
            {
                columnName: 'Markup',
                align: 'center',
                customRenderer: MarkupCustomRenderer(tableState),
            },
            {
                columnName: 'M.R.P',
                align: 'center',
                customRenderer: MRPCustomRenderer(tableState),
            },
        ],
    };

    // return
    return <Table {...tableProps} />;
};
