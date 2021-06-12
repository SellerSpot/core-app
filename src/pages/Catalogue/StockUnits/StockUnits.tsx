import { State, useState } from '@hookstate/core';
import { Icon } from '@iconify/react';
import { Button } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { PageHeader } from '../../../components/Compounds/PageHeader/PageHeader';
import { ICONS } from '../../../utilities/utilities';
import { StockUnitsTable } from './Components/StockUnitsTable/StockUnitsTable';
import styles from './StockUnits.module.scss';
import { IStockUnitPageState } from './StockUnits.types';

const PageHeaderComponent = (props: { pageState: State<IStockUnitPageState> }) => {
    // props
    const {} = props;

    // components
    const NewStockUnitButton = () => {
        return (
            <Button
                label="NEW STOCK UNIT"
                variant="contained"
                theme="primary"
                startIcon={<Icon icon={ICONS.outlineAdd} />}
            />
        );
    };

    // draw
    return (
        <PageHeader
            title={'Stock Units'}
            actions={[<NewStockUnitButton key={'NewStockUnitButton'} />]}
        />
    );
};

export const StockUnits = (): ReactElement => {
    // state
    const pageState = useState<IStockUnitPageState>({
        stockUnits: [],
        showSliderModal: false,
    });

    // draw
    return (
        <div className={styles.wrapper}>
            <PageHeaderComponent pageState={pageState} />
            <StockUnitsTable pageState={pageState} />
        </div>
    );
};